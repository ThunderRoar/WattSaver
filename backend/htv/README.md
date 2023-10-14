## Creating Python Virtual Environment
```bash
python3.8 -m venv htv
```
## Activate Virtual Environment
```bash
source htv/bin/activate
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
## Create requirements.txt file
```bash
pip freeze > requirements.txt
```
## Running Server
```bash
python wyzefetch.py
```
## References
- https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/
- https://www.mongodb.com/docs/manual/core/timeseries/timeseries-procedures/
- https://www.mongodb.com/languages/python
- https://github.com/shauntarves/wyze-sdk
- https://wyze-sdk.readthedocs.io/en/latest/index.html