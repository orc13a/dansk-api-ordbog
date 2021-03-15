const fs = require("fs");
const path = require('path');
const { Word } = require('./classes');
const { convertSpecielChar, calASCII } = require('./getFuncs');

let rootPath = path.join(__dirname);
let allWordsPath = rootPath + '/words/words.json';

let totalWordListFile = fs.readFileSync("./words/total-word-list.txt", "utf-8");
let totalWordList = totalWordListFile.split('\n');

let allWords;

let allSortingLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å'];
let theWords = [];

fs.readFile(allWordsPath, (err, data) => {
    if (err) throw err;

    allWords = JSON.parse(data);

    sortSetup(totalWordList);
});

let firstChar = '';
let secondChar = '';
let startIndex = 0;
// let rawWord = '';
let word = '';
let calIndex;
let letterArr = [];
let letterArrPlac = [];

function sortSetup(wordsFromFile) {
    console.log(`\n==> Sorting has started`);
    console.log(`==> Setting letter arrays up`);
    console.log(`==> Please wait...\n`);

    for (const letter in allWords) {
        // allWords[letter].length = wordsFromFile.length;
        for (let i = 0; i < wordsFromFile.length; i++) {
            allWords[letter][i] = [];
        }
    }

    let rawData = JSON.stringify(allWords, null, 2);
    
    fs.writeFile(allWordsPath, rawData, (err) => {
        if(err) throw err;
        
        sort(wordsFromFile);
    });
}

function sort(wordsFromFile) {
    console.log(`\n==> Placing words into letter arrays`);
    console.log(`==> Please wait...\n`);

    wordsFromFile.forEach(rawWord => {
        firstChar = convertSpecielChar(rawWord.charAt(0));
        secondChar = convertSpecielChar(rawWord.charAt(1));

        if (secondChar.toUpperCase() == firstChar.toUpperCase()) {
            letterArr = allWords['Å'];
        } else {
            letterArr = allWords[firstChar.toUpperCase()];
        }

        calIndex = calASCII(rawWord, wordsFromFile);
        letterArr[calIndex].push(new Word(rawWord));
    });
    
    let rawData = JSON.stringify(allWords, null, 2);
    
    fs.writeFile(allWordsPath, rawData, (err) => {
        if(err) throw err;
    });

    console.log(`==> Finish sorting'\n`);
}