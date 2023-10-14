# https://github.com/electricitymaps/electricitymaps-contrib/tree/master/parsers

#!/usr/bin/env python3
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from logging import Logger, getLogger

# The arrow library is used to handle datetimes
import arrow

# pandas processes tabular data
import pandas as pd
from requests import Session

from pymongo_get_database import get_database
dbname = get_database()
collection_name = dbname["CA_ON"]

"""
Some notes about timestamps:

IESO website says:
"The IESO uses the "Hour Ending" naming convention for the hours in a day. For example, Hour 1 is from 12 am. to 1 am.,
Hour 2 is from 1 am. to 2 am. Hours 1-24 are the hours from midnight one day through midnight the next day."

Observations:
- At 13:53, HOEP report will have data with "Hour" column from 1 to 13.
  Output and Capability report will have data with "Hour" column from 1 to 13.
  Intertie Flow report will have data with "Hour" column from 1 to 13 *and* Interval column
  from 1 to 12 for all of these hours, including the 13th hour.
- At 14:18, HOEP report will go up to 14, Output report will go up to 14,
  but update for Intertie report is not yet updated.
- At 14:31, Intertie report is updated with Hour 14 which has Intervals 1 to 12.

In the script, the Intertie report is shifted 1 hour and 5 minutes back, so that it lines up with
the production and price data availability.
"""

# IESO says "Eastern Standard Time is used year round."
# This would mean daylight savings is not used (that is called "Eastern Daylight Time"),
# and we need to use UTC-5 rather than 'Canada/Eastern'
tz_obj = timezone(timedelta(hours=-5), name="UTC-5")

# fuel types used by IESO
MAP_GENERATION = {
    "BIOFUEL": "biomass",
    "GAS": "gas",
    "HYDRO": "hydro",
    "NUCLEAR": "nuclear",
    "SOLAR": "solar",
    "WIND": "wind",
}

# exchanges and sub-exchanges used by IESO
MAP_EXCHANGE = {
    "MANITOBA": "CA-MB->CA-ON",
    "MANITOBA SK": "CA-MB->CA-ON",
    "MICHIGAN": "CA-ON->US-MIDW-MISO",
    "MINNESOTA": "CA-ON->US-MIDW-MISO",
    "NEW-YORK": "CA-ON->US-NY-NYIS",
    "PQ.AT": "CA-ON->CA-QC",
    "PQ.B5D.B31L": "CA-ON->CA-QC",
    "PQ.D4Z": "CA-ON->CA-QC",
    "PQ.D5A": "CA-ON->CA-QC",
    "PQ.H4Z": "CA-ON->CA-QC",
    "PQ.H9A": "CA-ON->CA-QC",
    "PQ.P33C": "CA-ON->CA-QC",
    "PQ.Q4C": "CA-ON->CA-QC",
    "PQ.X2Y": "CA-ON->CA-QC",
}

PRODUCTION_URL = "http://reports.ieso.ca/public/GenOutputCapability/PUB_GenOutputCapability_{YYYYMMDD}.xml"
PRICE_URL = (
    "http://reports.ieso.ca/public/DispUnconsHOEP/PUB_DispUnconsHOEP_{YYYYMMDD}.xml"
)
EXCHANGES_URL = "http://reports.ieso.ca/public/IntertieScheduleFlow/PUB_IntertieScheduleFlow_{YYYYMMDD}.xml"

XML_NS_TEXT = "{http://www.theIMO.com/schema}"


def _fetch_ieso_xml(
    target_datetime: datetime | None,
    session: Session | None,
    logger: Logger,
    url_template,
):
    dt = (
        arrow.get(target_datetime)
        .to(tz_obj)
        .replace(hour=0, minute=0, second=0, microsecond=0)
    )

    r = session or Session()
    url = url_template.format(YYYYMMDD=dt.format("YYYYMMDD"))
    response = r.get(url)

    if not response.ok:
        # Data is generally available for past 3 months. Requesting files older than this
        # returns an HTTP 404 error.
        logger.info(
            "CA-ON: failed getting requested data for datetime {} from IESO server - URL {}".format(
                dt, url
            )
        )
        return dt, None

    xml = ET.fromstring(response.text)

    return dt, xml


def _parse_ieso_hour(output, target_dt):
    hour = int(output.find(XML_NS_TEXT + "Hour").text)
    return target_dt.shift(hours=hour).datetime


def fetch_production(
    zone_key: str = "CA-ON",
    session: Session | None = None,
    target_datetime: datetime | None = None,
    logger: Logger = getLogger(__name__),
) -> list:
    """Requests the last known production mix (in MW) of a given region."""

    dt, xml = _fetch_ieso_xml(target_datetime, session, logger, PRODUCTION_URL)

    if not xml:
        return []

    generators = (
        xml.find(XML_NS_TEXT + "IMODocBody")
        .find(XML_NS_TEXT + "Generators")
        .findall(XML_NS_TEXT + "Generator")
    )

    def production_or_zero(output):
        # Sometimes the XML data has no "EnergyMW" tag for a given plant at a given hour.
        # The report XSL formats this as "N/A" - we return 0
        tag = output.find(XML_NS_TEXT + "EnergyMW")
        if tag is not None:
            return tag.text
        else:
            return 0

    # flat iterable of per-generator-plant productions per time from the XML data
    all_productions = (
        {
            "name": generator.find(XML_NS_TEXT + "GeneratorName").text,
            "fuel": MAP_GENERATION[generator.find(XML_NS_TEXT + "FuelType").text],
            "dt": _parse_ieso_hour(output, dt),
            "production": float(production_or_zero(output)),
        }
        for generator in generators
        for output in generator.find(XML_NS_TEXT + "Outputs").findall(
            XML_NS_TEXT + "Output"
        )
    )

    df = pd.DataFrame(all_productions)

    # group individual plants using the same fuel together for each time period
    by_fuel = df.groupby(["dt", "fuel"]).sum().unstack()
    # to debug, you can `print(by_fuel)` here, which gives a very pretty table

    by_fuel_dict = by_fuel["production"].to_dict("index")

    data = [
        {
            "datetime": time.to_pydatetime(),
            "zoneKey": zone_key,
            "production": productions,
            "storage": {},
            "source": "ieso.ca",
        }
        for time, productions in by_fuel_dict.items()
    ]

    # being constructed from a dict, data is not guaranteed to be in chronological order.
    # sort it for clean-ness and easier debugging.
    data = sorted(data, key=lambda dp: dp["datetime"])

    return data


if __name__ == "__main__":
    """Main method, never used by the Electricity Map backend, but handy for testing."""

    now = arrow.utcnow()
    print("we expect correct results when time in UTC and Ontario differs")
    print(
        "data should be for {}".format(
            now.replace(hour=2).to(tz_obj).format("YYYY-MM-DD")
        )
    )
    print('fetch_production("CA-ON", target_datetime=now.replace(hour=2)) ->')
    production = fetch_production("CA-ON", target_datetime=now.replace(hour=2))
    try:
        production_array = []
        for sensorDate in production:
            if collection_name.find_one({"timestamp": sensorDate['datetime']}) is None:
                example_json = {
                    "metadata": {
                        "sensorId": sensorDate['zoneKey'],
                        "type": "production"
                    },
                    "timestamp": sensorDate['datetime'],
                    "biomass": sensorDate['production']['biomass'],
                    "gas": sensorDate['production']['gas'],
                    "hydro": sensorDate['production']['hydro'],
                    "nuclear": sensorDate['production']['nuclear'],
                    "solar": sensorDate['production']['solar'],
                    "wind": sensorDate['production']['wind']
                }
                production_array.append(example_json)
        if len(production_array) >= 1:
            print(production_array)
            collection_name.insert_many(production_array)
        # collection_name.update_many(usage_array)
        print("Completed update")
    except:
        print("An exception occurred")