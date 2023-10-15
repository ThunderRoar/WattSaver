import express from 'express';
import bodyParser from "body-parser";
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.send("Try calling our API endpoints");
});

app.post('/api/update', async function (req, res) {
    const data = req.body;
    logData(req)
    console.log('Received data: ', data);
    try {
        const event = new Date(req.body.timestamp);
        const queryTime = event.toISOString();

        const body = {timestamp: queryTime};
        const response = await fetch('http://localhost:8000/update', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        console.log("Bar")
        console.log(response.status);
        res.send(response.status);
    }
    catch {
        res.status(418).send("There was an error with handling your request");
    }
});

app.listen(3000, function() {
    console.log('Server listening at http://CONTAINER_IP_ADDRESS:' + port +'/api/endpoint');
});

function logData(req) {
    console.log(req.ip);
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    console.log(dateTime);
}