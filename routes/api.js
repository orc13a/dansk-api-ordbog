const express = require('express');
const api = express.Router();
const bodyParser = require('body-parser');

let httpType;
let apiBaseUrl;

api.get('/', (req, res) => {
    if (req.secure != false) {
        httpType = "https://";
    } else {
        httpType = "http://";
    }

    apiBaseUrl = `${httpType}${req.headers.host}${req.baseUrl}`;

    res.status(200).json({
        "all_words": `${apiBaseUrl}/all`,
        "word": `${apiBaseUrl}/word/{word}`
    });
});

module.exports = api;