const subdomain = require('express-subdomain');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const port = 8080;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/api', require('./routes/api'));

server.listen(port);