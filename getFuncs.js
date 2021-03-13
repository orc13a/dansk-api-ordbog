const fs = require("fs");
const path = require('path');

let rootP = path.join(__dirname);
let ASCIIpath = rootP + '/words/ASCII-sheet.json';
let wPath = rootP + '/words/words.json';
let ASCIIsheet;
let allWords;

fs.readFile(wPath, (err, data) => {
    if (err) throw err;
    allWords = JSON.parse(data);
});

fs.readFile(ASCIIpath, (err, data2) => {
    if (err) throw err;
    ASCIIsheet = JSON.parse(data2);
});

// ----------------------------------------
// Functions
// ----------------------------------------

const calASCII = (word, array) => {
    var wordSplitted = word.split('');
    var letterASCIIsum = 0;
    var arrLen;
    
    if (array.length != 0) {
        arrLen = array.length;
    } else {
        arrLen = 1;
    }

    wordSplitted.forEach(letter => {
        letterASCIIsum += ASCIIsheet[letter];
    });
    
    return letterASCIIsum % arrLen;
}

const getWord = (wantedWord) => {
    var wordSection;
    var wantedWordArr; 
    var seachedAsciiIndex = 0;
    var gottenWordObj = {};

    wordSection = allWords[wantedWord.charAt(0).toUpperCase()];

    seachedAsciiIndex = calASCII(wantedWord, wordSection);

    wantedWordArr = wordSection[seachedAsciiIndex];

    for (let i = 0; i < wantedWordArr.length; i++) {
        var arrWord = wantedWordArr[i];

        if (arrWord.word === wantedWord) {
            gottenWordObj = arrWord;
        } 
    }

    return gottenWordObj;
};

module.exports = {
    calASCII,
    getWord
};