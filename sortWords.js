const fs = require("fs");
const path = require('path');

let rootPath = path.join(__dirname);
let allWordsPath = rootPath + '/words/words.json';
let ASCIIpath = rootPath + '/words/ASCII-sheet.json';

let allWords;
let ASCIIsheet;

let wordList1 = fs.readFileSync("./words-list-1.txt", "utf-8");
let wordsFromFile = wordList1.split('\n');

fs.readFile(allWordsPath, (err, data) => {
    if (err) throw err;

    allWords = JSON.parse(data);

    fs.readFile(ASCIIpath, (err, data2) => {
        if (err) throw err;
    
        ASCIIsheet = JSON.parse(data2);
    
        sort('a');
    });
});

let start = true;
let firstChar = '';
let secondChar = '';

function sort(letter) {
    var letterArr = allWords[letter.toUpperCase()];
    
    for (let w = 0; w < wordsFromFile.length; w++) {
        var rawWord = wordsFromFile[w];
        var word = '';

        if (rawWord.includes('\r')) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }
        console.log(word);
        calASCII(word);
    }
    
    let rawData = JSON.stringify(allWords, null, 2);
    
    fs.writeFile(allWordsPath, rawData, (err) => {
        if(err) throw err;
    });
}

function calASCII(word) {
    var wordSplitted = word.split('');
    var letterASCIIsum = 0;

    wordSplitted.forEach(letter => {
        letterASCIIsum += ASCIIsheet[letter];
        console.log(letterASCIIsum);
    });
}