const bodyParser = require('body-parser');
const cors = require('cors');
const jsonParser = bodyParser.json();

express = require('express');

const app = express();

app.use('*', cors());

const port = process.env.PORT || 5000;
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
        const key = "sets"
        const field = getField();
        console.log('Field: ' + req.query.field);
        console.log('Field: ' + field);

        client.hget(key, field, (err, results) => {
            if(results){
                console.log(results);
                res.setHeader('Content-Type', 'text/plain');
                res.send(results);
            }else{
                console.log(err);
                res.send(err);
            }
        })
    })
})

app.post('/answers/addUserData', jsonParser, (req, res) => {
    connect.createConnection(redisPort).then(client => {
        const uuid = uuidv4();

        const set_1 = JSON.stringify(req.body.set_1);
        const set_2 = JSON.stringify(req.body.set_2);
        const set_3 = JSON.stringify(req.body.set_3);

        client.hset(uuid, "set_1", set_1, redis.print);
        client.hset(uuid, "set_2", set_2, redis.print);
        client.hset(uuid, "set_3", set_3, redis.print);
        
        client.hgetall(uuid, (err, results) => {
            if(results){
                res.send(results);
            }else{
                res.send(err);
            }
        });
    
        client.quit((err, reply) => {
            if(!err){
                console.log(reply);
            }else{
                console.log(err);
            }
        });
    });
}) 

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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
