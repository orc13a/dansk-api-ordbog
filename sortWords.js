const fs = require("fs");
const path = require('path');
const { Word } = require('./classes');
const { convertSpecielChar, calASCII } = require('./getFuncs');

let rootPath = path.join(__dirname);
let allWordsPath = rootPath + '/words/words.json';

let allWords;

let allSortingLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å'];
let theWords = [];

let totalWordList = fs.readFileSync("./words/total-word-list.txt", "utf-8");
let totalWordListFile = totalWordList.split('\n');

let wordList1 = fs.readFileSync("./words/words-list-1.txt", "utf-8");
let words1FromFile = wordList1.split('\n');
let wordList2 = fs.readFileSync("./words/words-list-2.txt", "utf-8");
let words2FromFile = wordList2.split('\n');

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
    
    for (let w = 0; w < wordsFromFile.length; w++) {
        rawWord = wordsFromFile[w];

        if (rawWord.includes('\r')) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }

        firstChar = convertSpecielChar(word.charAt(0));
        secondChar = word.charAt(1);

        if (firstChar.toUpperCase() === secondChar.toUpperCase()) {
            letterArr = allWords['Å'];
            letterArrPlac = wordsJSONplaceholder['Å'];
        } else {
            letterArr = allWords[firstChar.toUpperCase()];
            letterArrPlac = wordsJSONplaceholder[firstChar.toUpperCase()];
        }
        
        calIndex = calASCII(word, letterArrPlac);
        // if (wordsJSONplaceholder[calIndex] === undefined) {
        //     letterArr[calIndex] = [];

        //     letterArrPlac[calIndex] = [];
        // }

        // letterArr[calIndex].push(word);

        // letterArrPlac[calIndex].push(word);
    }
    
    // let rawData = JSON.stringify(allWords, null, 2);
    
    // fs.writeFile(allWordsPath, rawData, (err) => {
    //     if(err) throw err;
    // });

    console.log(`==> Finish sorting'\n`);
}