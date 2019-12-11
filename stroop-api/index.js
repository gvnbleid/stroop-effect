const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

express = require('express');

const app = express();

const port = 3001;
const redisPort = 6379;

const connect = require('./Connection');
const redis = require("redis");

app.get('/stimuli/getPackage', (req, res) => {
    const getField = () => {
        switch(req.query.field) {
            case '0':
                return "set_1";
            case '1':
                return "set_2";
            case '2':
                return "set_3";
        }
    }
    connect.createConnection(redisPort).then(client => {
        const key = "uuid1111"
        const field = getField();
        console.log('Field: ' + req.query.field);
        console.log('Field: ' + field);

        client.hget(key, field, (err, results) => {
            if(results){
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                //res.setHeader('Access-Control-Allow-Methods', 'GET');
                //res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
                res.setHeader('Content-Type', 'application/json');
                res.send(results);
            }else{
                res.send(err);
            }
        })
    })
})

app.post('/stimuli/addPackage', jsonParser, (req, res) => {
    connect.createConnection(redisPort).then(client => {
        const set_1 = JSON.stringify(req.body.set_1);
        const set_2 = JSON.stringify(req.body.set_2);
        const set_3 = JSON.stringify(req.body.set_3);
        const uuid = req.body.uuid;

        client.hset(uuid, "set_1", set_1, redis.print);
        client.hset(uuid, "set_2", set_2, redis.print);
        client.hset(uuid, "set_3", set_3, redis.print);
        client.hgetall(uuid, (err, results) => {
            if(results){
                res.send(results);
            }else{
                res.send(err);
            }
        })

        client.quit((err, reply) => {
            if(!err){
                console.log(reply);
            }else{
                console.log(err);
            }
        })
    })
})

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});

//Run app, then load http://localhost:port in a browser to see the output.
