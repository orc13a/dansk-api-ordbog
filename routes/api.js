const express = require('express');
const api = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

api.get('/words', (req, res) => {
    client.connect(err => {
        console.log(client.db('dansk-API-ordbog').collection('words').findOne({}));

        client.close();
    });

    res.end();
});

api.post('/add', (req, res) => {
    
});

module.exports = api;