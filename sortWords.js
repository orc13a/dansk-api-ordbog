const fs = require("fs");
const path = require('path');
const { Word } = require('./classes');
const { calASCII } = require('./getFuncs');

let rootPath = path.join(__dirname);
let allWordsPath = rootPath + '/words/words.json';

let allWords;

let insertingArr = [];
let theWords = [];

let wordList1 = fs.readFileSync("./words/words-list-1.txt", "utf-8");
let wordsFromFile = wordList1.split('\n');

fs.readFile(allWordsPath, (err, data) => {
    if (err) throw err;

    allWords = JSON.parse(data);

    sort('a');
});

let start = true;
let firstChar = '';
let secondChar = '';

function sort(letter) {
    console.log(`==> Sorting for '${letter}' has started`);
    var letterArr = allWords[letter.toUpperCase()];

    console.log(`==> Please wait...\n`);
    for (let w = 0; w < wordsFromFile.length; w++) {
        var rawWord = wordsFromFile[w];
        var word = '';
        
        if (rawWord.includes('\r')) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }

        firstChar = word.charAt(0);
        secondChar = word.charAt(1);

        if (firstChar != letter.toUpperCase()) {
            break;
        }

        if (letter.toLowerCase() != 'å') {
            if (secondChar != 'a' && secondChar != 'A') {
                theWords.push(word);
            }
        } else {
            
        }
    }
    

    for (let i = 0; i < theWords.length; i++) {
        letterArr[i] = [];
    }


    for (let i = 0; i < wordsFromFile.length; i++) {
        var rawWord = wordsFromFile[i];
        var word = '';
        
        if (rawWord.includes('\r')) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }

        firstChar = word.charAt(0);
        secondChar = word.charAt(1);

        if (firstChar != letter.toUpperCase()) {
            break;
        }

        if (letter.toLowerCase() != 'å') {
            var calIndex = calASCII(word, theWords);

            letterArr[calIndex].push(new Word(word));
        } else {

        }
    }
    
    let rawData = JSON.stringify(allWords, null, 2);
    
    fs.writeFile(allWordsPath, rawData, (err) => {
        if(err) throw err;
    });

    console.log(`==> Finish sorting for '${letter}'\n`);
}