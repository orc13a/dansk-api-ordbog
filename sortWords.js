const fs = require("fs");
const path = require('path');
const { Word } = require('./classes');
const { convertSpecielChar, calASCII } = require('./getFuncs');

let rootPath = path.join(__dirname);
let allWordsPath = rootPath + '/words/words.json';

let allWords;

let allSortingLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å'];
let theWords = [];

fs.readFile(allWordsPath, (err, data) => {
    if (err) throw err;

    allWords = JSON.parse(data);

    //sort(words1FromFile);
});

let firstChar = '';
let secondChar = '';
let startIndex = 0;
let rawWord = '';
let word = '';
let calIndex;
let letterArr = [];
let letterArrPlac = [];

function sort(wordsFromFile) {
    console.log(`==> Sorting has started`);
    console.log(`==> Please wait...\n`);
    

    
    // let rawData = JSON.stringify(allWords, null, 2);
    
    // fs.writeFile(allWordsPath, rawData, (err) => {
    //     if(err) throw err;
    // });

    console.log(`==> Finish sorting'\n`);
}