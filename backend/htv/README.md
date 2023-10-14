# User
## Activate Virtual Environment
```bash
virtualenv .
```
## Create .env File
Requires Wyze credentials and [Key ID & API Key](https://developer-api-console.wyze.com/#/apikey/view)
```
WYZE_EMAIL=<WYZE_EMAIL>
WYZE_PASSWORD=<WYZE_PASSWORD>
WYZE_KEY_ID=<WYZE_KEY_ID>
WYZE_API_KEY=<WYZE_API_KEY>
```
## Setting Up Server
```bash
pip install -r requirements.txt
```
## Running Server
```bash
python wyzefetch.py
```
## Updating Database
Send POST request to `http://localhost:8000/update` to update database
# Developer
## Python
### Creating Python Virtual Environment
```bash
python3.8 -m venv htv
```
### Create requirements.txt file
```bash
pip freeze > requirements.txt
```
## MongoDB
### Create database
```bash
use HackTheValley
```
### Create Time Series Collection
```bash
db.createCollection(
"Outlet",
{
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",
    granularity: "hours"
}})
```

## References
- https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/
- https://www.mongodb.com/docs/manual/core/timeseries/timeseries-procedures/
- https://www.mongodb.com/languages/python
- https://github.com/shauntarves/wyze-sdk
- https://wyze-sdk.readthedocs.io/en/latest/index.html
- https://stackoverflow.com/questions/54484890/ssl-handshake-issue-with-pymongo-on-python3
- https://stackoverflow.com/questions/22715086/scheduling-python-script-to-run-every-hour-accurately
- https://stackoverflow.com/questions/68579397/is-there-an-easy-way-to-receive-http-post-request-in-python-like-in-php