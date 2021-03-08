const express = require('express');
const api = express.Router();

api.get('/', function(req, res) {
    res.send('Welcome to our API!');
});

module.exports = api;