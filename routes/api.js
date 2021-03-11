// NPM packages
const express = require('express');
const api = express.Router();
const bodyParser = require('body-parser');
const { getWord } = require('../getFuncs');
const path = require('path');
const fs = require("fs");

let rP = path.join(__dirname);
let wordsPath = rP + '../words/words.json';
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

    res.end();
});

api.get('/word/:seachedWord', async (req, res) => {
    var searchedWord = req.params.seachedWord;    
    const gottenWord = await getWord(searchedWord);

    console.log(gottenWord);

    res.end();
});

api.get('/add', (req, res) => {
    console.log(new Word('Kat', ['substantiv', 'fælleskøn'], ['-ten', '-te', '-tene']));
    res.end();
});

module.exports = api;