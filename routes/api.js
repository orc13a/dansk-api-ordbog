// NPM packages
const express = require('express');
const api = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");

// ----------------------------------------
// Functions
// ----------------------------------------

function getBaseUrl(req) {
    if (req.secure != false) {
        httpType = "https://";
    } else {
        httpType = "http://";
    }

    return `${httpType}${req.headers.host}${req.baseUrl}`;
}

// ----------------------------------------
// Requests
// ----------------------------------------

api.get('/', (req, res) => {
    const apiBaseUrl = getBaseUrl(req);

    res.status(200).json({
        "word_url": `${apiBaseUrl}/word/{word}`
    });

    res.end();
});

module.exports = api;