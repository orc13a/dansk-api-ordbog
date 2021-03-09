const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const port = 8080;

require('dotenv').config();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.set("view engine", "ejs");
server.set("views", __dirname + "/views");
server.set("view options", { layout: false });
server.use(express.static(__dirname + '/public'));

server.use('/api', require('./routes/api'));
server.use('/', require('./routes/frontEnd'));

// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     console.log('we are in!');
//     client.close();
// });

server.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`\n> Server listning on: http://localhost:${port}\n`);
});