const subdomain = require('express-subdomain');
const express = require('express');
const server = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const port = 8080;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', function(req, res) {
    res.send('Homepage');
});

server.use(subdomain('api', require('./api')));
server.listen(port);