const fs = require("fs");
const path = require('path');

let rootP = path.join(__dirname);
let ASCIIpath = rootP + '/words/ASCII-sheet.json';
let wPath = rootP + '/words/words.json';
let ASCIIsheet;
let allWords;

// let specielChars = ['Å', 'C', 'E', 'I', 'D', 'N', 'O', 'U', 'Y', 'B']

let specielCharsMatch = [
    ['Å', 'À', 'Á', 'Â', 'Ã', 'Ä'],
    ['C', 'Ç'],
    ['E', 'È', 'É', 'Ê', 'Ë'],
    ['I', 'Ì', 'Í', 'Î', 'Ï'],
    ['D', 'Ð'],
    ['N', 'Ñ'],
    ['O', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö'],
    ['U', 'Ù', 'Ú', 'Û', 'Ü'],
    ['Y', 'Ý',],
    ['B', 'ß']
];

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
const convertSpecielChar = (char) => {
    var returnChar;

    for (let i = 0; i < specielCharsMatch.length; i++) {
        var charArr = specielCharsMatch[i];

        if (charArr.includes(char.toUpperCase()) === true) {
            returnChar = charArr[0];
            break;
        }
    }

    if (returnChar === undefined) {
        returnChar = char;
    }

    return returnChar.toUpperCase();
}

const calASCII = (word, array) => {
    var wordSplitted = word.split('');
    var letterASCIIsum = 0;
    var arrLen;

    if (array.length === undefined || array.length === 0) {
        arrLen = 1;
    } else {
        arrLen = array.length;
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
    convertSpecielChar,
    calASCII,
    getWord
};