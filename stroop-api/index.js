const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

express = require('express');

const app = express();

const port = 3001;
const redisPort = 6379;

const connect = require('./Connection');
const redis = require("redis");

app.get('/stimuli/getPackage', (req, res) => {
    connect.createConnection(redisPort).then(client => {
        res.send("The package");
        console.log(client);
    })
});

app.post('/stimuli/addPackage', jsonParser, (req, res) => {
    connect.createConnection(redisPort).then(client => {
        const package_1 = JSON.stringify(req.body.package_1);
        const package_2 = JSON.stringify(req.body.package_2);
        const package_3 = JSON.stringify(req.body.package_3);
        const uuid = req.body.uuid;

        client.hset(uuid, "package_1", package_1, redis.print);
        client.hset(uuid, "package_2", package_2, redis.print);
        client.hset(uuid, "package_3", package_3, redis.print);
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
    console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.
