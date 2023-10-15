import express from 'express';
import bodyParser from "body-parser";
import fetch from 'node-fetch';
import {mongoQueryOne} from "./mongo.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.send("Try calling our API endpoints");
});

app.post('/api/update_ieso', async function (req, res) {
    const data = req.body;
    logData(req)
    console.log('Received data: ', data);
    try {
        const event = new Date(req.body.timestamp);
        const queryTime = event.toISOString();

        const body = {timestamp: queryTime};
        const response = await fetch('http://localhost:4000/update', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        console.log(response.status);
        res.send(response.status);
    }
    catch {
        res.status(418).send("There was an error with handling your request");
    }
});

app.post('/api/update_wyze', async function (req, res) {
    const data = req.body;
    logData(req)
    console.log('Received data: ', data);
    try {
        const body = { };
        const response = await fetch('http://localhost:6000/update', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        console.log(response.status);
        res.send(response.status);
    }
    catch {
        res.status(418).send("There was an error with handling your request");
    }
});

app.post('/api/query', async function (req, res) {
    const data = req.body;
    logData(req)
    console.log('Received data: ', data);
    try {
        const event = new Date(req.body.timestamp);
        const ieso_result = await mongoQueryOne("timestamp", event, "CA_ON");
        const usage_result = await mongoQueryOne("timestamp", event, "Outlet");
        let usage_number = 0;
        if (usage_result != null) {
            usage_number = usage_result.W;
        }
        // console.log(ieso_result);

        const response = JSON.stringify({
            "timestamp": event,
            "solar": ieso_result.solar,
            "gas": ieso_result.gas,
            "wind": ieso_result.wind,
            "hydro": ieso_result.hydro,
            "biomass": ieso_result.biomass,
            "nuclear": ieso_result.nuclear,
            "usage": usage_number
        });
        console.log(response);
        res.send(response);
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