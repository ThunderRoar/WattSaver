# User
## Setting up Wyze Scrapper
### Activate Virtual Environment
Run command in `backend` folder
```bash
python3 -m venv htv

source htv/bin/activate
```
### Create .env File
Create in `htv` folder
Requires Wyze credentials and [Key ID & API Key](https://developer-api-console.wyze.com/#/apikey/view)
```
WYZE_EMAIL=<WYZE_EMAIL>
WYZE_PASSWORD=<WYZE_PASSWORD>
WYZE_KEY_ID=<WYZE_KEY_ID>
WYZE_API_KEY=<WYZE_API_KEY>
MONGO_CONNECTION=<MONGO_CONNECTION>
```
### Setting Up Server
```bash
pip install -r requirements.txt
```
### Running Server
```bash
python wyzefetch.py
```
## Setting up IESO Scrapper
### Activate Virtual Environment
Run command in `backend` folder
```bash
python3 -m venv parseXML

source parseXML/bin/activate
```
## Create .env File
Create in `parseXML` folder
```
MONGO_CONNECTION=<MONGO_CONNECTION>
```
### Setting Up Server
```bash
pip install -r requirements.txt
```
### Running Server
```bash
python CA_ON.py
```
## Setting up Node Backend
### Create .env File
Create in `nodend` folder
```
MONGO_CONNECT_STRING=<MONGO_CONNECT_STRING>
MONGO_DATABASE=<MONGO_DATABASE>
```
### Running Server
```bash
npm install

npm start
```
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
"CA_ON",
{
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",
    granularity: "hours"
}})
```
### Query Time Series
```bash
db.Outlet.findOne({
   "timestamp": ISODate("2023-10-13T06:00:00.000Z")
})

db.CA_ON.findOne({
   "timestamp": ISODate("2023-10-13T06:00:00.000Z")
})
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
- https://www.freecodecamp.org/news/how-to-dockerize-a-flask-app/