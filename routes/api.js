// NPM packages
const express = require('express');
const api = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");

// ----------------------------------------
// Functions
// ----------------------------------------

// For getting the base url
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
    // res.end() removed — res.json() already ends the response
});

api.get('/word/:word', (req, res) => {
    const word = req.params.word;
    const letter = word[0].toUpperCase();
    const filePath = path.join(__dirname, '../words/letter-arrays', `${letter}.json`);

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: `No word list found for letter "${letter}"` });
        }

        const words = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const match = words.find(w => w.word.toLowerCase() === word.toLowerCase());

        if (!match) {
            return res.status(404).json({ error: `Word "${word}" not found` });
        }

        res.status(200).json(match);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

module.exports = api;
