const fs = require("fs");
const path = require('path');

let rootP = path.join(__dirname);
let ASCIIpath = rootP + '/words/ASCII-sheet.json';
let wPath = rootP + '/words/words.json';
let ASCIIsheet;

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
    var allWords;
    var wordSection;
    var wantedWordArr; 
    var seachedAsciiIndex = 0;

    fs.readFile(wPath, (err, data) => {
        allWords = JSON.parse(data);
        wordSection = allWords[wantedWord.charAt(0).toUpperCase()];

        seachedAsciiIndex = calASCII(wantedWord, wordSection);
        wantedWordArr = wordSection[seachedAsciiIndex];

        for (let i = 0; i < wantedWordArr.length; i++) {
            var arrWord = wantedWordArr[i];
            
            if (arrWord.word === wantedWord) {
                return new Promise(resolve => {
                    resolve(arrWord);
                });
            } 
        }
    });
};

module.exports = {
    calASCII,
    getWord
};