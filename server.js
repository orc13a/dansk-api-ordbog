// NPM packages
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require('path');

require('dotenv').config()

let rootPath = path.join(__dirname);

// Server runtime port
const port = process.env.PORT || 8080;

// Midleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/api', require('./routes/api'));

// Server listen (where server will run)
server.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`\n> Server listning on: ${port}\n`);
});