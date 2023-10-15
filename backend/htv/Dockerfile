FROM python:3.11

# Create app directory
WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 6000
CMD [ "python3", "wyzefetch.py"]
