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
        "words": `${apiBaseUrl}/words?q={query}{&per_page}`,
        "word": `${apiBaseUrl}/word/{word}`,
        "word_initial": `${apiBaseUrl}/initial/{initial}`
    });
});

module.exports = api;