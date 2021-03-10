// NPM packages
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// Server runtime port
const port = 8080;

// Midleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.set("view engine", "ejs");
server.set("views", __dirname + "/views");
server.set("view options", { layout: false });
server.use(express.static(__dirname + '/public'));

server.use('/api', require('./routes/api'));
server.use('/', require('./routes/frontEnd'));

// Server listen (where server will run)
server.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`\n> Server listning on: http://localhost:${port}\n`);
});