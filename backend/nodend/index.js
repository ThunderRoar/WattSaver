import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.send("Try calling our API endpoints");
});

app.post('/api/query', async function (req, res) {
    const data = req.body;
    logData(req)
    console.log('Received data: ', data);
    let response = "No action received.";
    let result = "";
    try {
        response = JSON.stringify({
            "result": result
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