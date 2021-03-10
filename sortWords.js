const fs = require("fs");
const path = require('path');

let rootPath = path.join(__dirname);
let allWordsPath = rootPath + '/words/words.json';

let allWords;

let wordList1 = fs.readFileSync("./words-list-1.txt", "utf-8");
let wordsFromFile = wordList1.split('\n');

fs.readFile(allWordsPath, (err, data) => {
    if (err) throw err;

    allWords = JSON.parse(data);

    sort();
});

let start = true;
let firstChar = '';
let secondChar = '';

function sort(letter) {
    for (let w = 0; w < wordsFromFile.length; w++) {
        var rawWord = wordsFromFile[w];
        var word = '';

        if (rawWord.includes('\r')) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }

        
    }
    
    let rawData = JSON.stringify(allWords, null, 2);
    
    fs.writeFile(allWordsPath, rawData, (err) => {
        if(err) throw err;
    });
}