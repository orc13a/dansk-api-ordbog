const express = require('express');
const api = express.Router();
const bodyParser = require('body-parser');

let httpType;


api.get('/', (req, res) => {
    if (req.secure != false) {
        httpType = "https://";
    } else {
        httpType = "http://";
    }

    res.status(200).json({
        "all_words": `${httpType}${req.headers.host}${req.baseUrl}/all`,
        "word": `${httpType}${req.headers.host}${req.baseUrl}/word/{word}`
    });
});

module.exports = api;