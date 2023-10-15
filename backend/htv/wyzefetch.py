import os
from wyze_sdk import Client
from dotenv import load_dotenv
from wyze_sdk.errors import WyzeApiError
from datetime import datetime, timedelta
from pymongo_get_database import get_database
from flask import Flask, request, Response
dbname = get_database()
collection_name = dbname["Outlet"]

app = Flask(__name__)

load_dotenv()

os.environ['WYZE_EMAIL'] = os.getenv('WYZE_EMAIL')
os.environ['WYZE_PASSWORD'] = os.getenv('WYZE_PASSWORD')
os.environ['WYZE_KEY_ID'] = os.getenv('WYZE_KEY_ID')
os.environ['WYZE_API_KEY'] = os.getenv('WYZE_API_KEY')

response = Client().login(
    email=os.environ['WYZE_EMAIL'],
    password=os.environ['WYZE_PASSWORD'],
    key_id=os.environ['WYZE_KEY_ID'],
    api_key=os.environ['WYZE_API_KEY']
)
print(f"access token: {response['access_token']}")
print(f"refresh token: {response['refresh_token']}")

os.environ['WYZE_ACCESS_TOKEN'] = response['access_token']

client = Client(token=os.environ['WYZE_ACCESS_TOKEN'])

def queryPowerData(device_mac):
    try:
        plug = client.plugs.info(device_mac=device_mac)
        print(client.plugs.info(device_mac=plug.mac))
        # doesn't work
        start_time = datetime.today() - timedelta(days=1)
        end_time = datetime.today()
        print(f"Start time: {start_time}")
        print(f"End time: {end_time}")
        usage = client.plugs.get_usage_records(device_mac=plug.mac, device_model=plug.product.model, start_time=start_time, end_time=end_time)
        # print(f"usage: {usage}")
        print(type(usage))
        usage_array = []
        for record in usage:
            # print(type(record))
            hourly_data = vars(record)['hourly_data']
            for hour in hourly_data:
                # print(collection_name.find_one({"timestamp": hour}))
                if hourly_data[hour] != 0 and collection_name.find_one({"timestamp": hour}) is None:
                    # print(hour)
                    # print(hourly_data[hour])
                    example_json = {
                        "metadata": {
                            "sensorId": device_mac,
                            "type": "usage"
                        },
                        "timestamp": hour,
                        "W": hourly_data[hour]
                    }
                    usage_array.append(example_json)
                    # collection_name.update_one({
                    #     "timestamp": hour
                    # }, {"$set": {"W": hourly_data[hour]}})
        # print(usage_array)
        if len(usage_array) >= 1:
            collection_name.insert_many(usage_array)
        # collection_name.update_many(usage_array)
        print("Completed update")
    except WyzeApiError as e:
        # You will get a WyzeApiError if the request failed
        print(f"Got an error: {e}")

def updateData():
    # List devices
    try:
        response = client.devices_list()
        for device in client.devices_list():
            if device.product.model == "WLPPO":
                print(f"mac: {device.mac}")
                print(f"nickname: {device.nickname}")
                print(f"is_online: {device.is_online}")
                print(f"product model: {device.product.model}")
                queryPowerData(device.mac)
                return True
    except WyzeApiError as e:
        # You will get a WyzeApiError if the request failed
        print(f"Got an error: {e}")
        return False

@app.route('/update', methods = ['POST'])
def update_text():
    if updateData():
        return Response("Database updated successfully", status=200, mimetype='application/json')
    else:
        return Response("We hit an error", status=418, mimetype='application/json')

@app.route('/', methods=['POST', 'GET'])
def index():
    return 'Use POST requests'

if __name__ == '__main__':
    #app.debug = True
    app.run(host='0.0.0.0', port=6000)

# Turn on/off plug
# try:
#   plug = client.plugs.info(device_mac='7C78B2984C84-0001')
#   print(f"power: {plug.is_on}")
#   print(f"online: {plug.is_online}")
#
#   if plug.is_on:
#     # client.plugs.turn_off(device_mac=plug.mac, device_model=plug.product.model, after=timedelta(hours=3))
#     client.plugs.turn_off(device_mac=plug.mac, device_model=plug.product.model)
#   else:
#     client.plugs.turn_on(device_mac=plug.mac, device_model=plug.product.model)
#
#     plug = client.plugs.info(device_mac=plug.mac)
#     assert plug.is_on is True
# except WyzeApiError as e:
#     # You will get a WyzeApiError if the request failed
#     print(f"Got an error: {e}")