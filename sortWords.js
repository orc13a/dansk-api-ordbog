const fs = require("fs");
const path = require('path');
const { Word } = require('./classes');
const { calASCII } = require('./getFuncs');

let rootPath = path.join(__dirname);
let allWordsPath = rootPath + '/words/words.json';

let allWords;

let allSortingLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å'];
let theWords = [];

let wordsJSONplaceholder = {
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": [],
    "G": [],
    "H": [],
    "I": [],
    "J": [],
    "K": [],
    "L": [],
    "M": [],
    "N": [],
    "O": [],
    "P": [],
    "Q": [],
    "R": [],
    "S": [],
    "T": [],
    "U": [],
    "V": [],
    "W": [],
    "X": [],
    "Y": [],
    "Z": [],
    "Æ": [],
    "Ø": [],
    "Å": []
};

let wordList1 = fs.readFileSync("./words/words-list-1.txt", "utf-8");
let words1FromFile = wordList1.split('\n');
let wordList2 = fs.readFileSync("./words/words-list-2.txt", "utf-8");
let words2FromFile = wordList2.split('\n');

fs.readFile(allWordsPath, (err, data) => {
    if (err) throw err;

    allWords = JSON.parse(data);

    sort(words1FromFile);
});

function sort(wordsFromFile) {
    let firstChar = '';
    let secondChar = '';
    let startIndex = 0;
    let rawWord = '';
    let word = '';
    let calIndex;
    let letterArr = [];
    let letterArrPlac = [];

    console.log(`==> Sorting has started`);
    console.log(`==> Please wait...\n`);
    
    for (let w = 0; w < wordsFromFile.length; w++) {
        rawWord = wordsFromFile[w];

        if (rawWord.includes('\r')) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }

        firstChar = word.charAt(0);
        secondChar = word.charAt(1);

        if (firstChar.toUpperCase() === secondChar.toUpperCase()) {
            letterArr = allWords['Å'];
            letterArrPlac = wordsJSONplaceholder['Å'];
        } else {
            letterArr = allWords[firstChar.toUpperCase()];
            letterArrPlac = wordsJSONplaceholder[firstChar.toUpperCase()];
        }
        
        calIndex = calASCII(word, letterArrPlac);
        
        if (allWords[calIndex] === undefined) {
            letterArr[calIndex] = [];
            letterArr[calIndex].push(word);

            letterArrPlac[calIndex] = [];
            letterArrPlac[calIndex].push(word);
        } else {
            letterArr[calIndex].push(word);

            letterArrPlac[calIndex].push(word);
        }
    }
    
    // let rawData = JSON.stringify(allWords, null, 2);
    
    // fs.writeFile(allWordsPath, rawData, (err) => {
    //     if(err) throw err;
    // });

    console.log(`==> Finish sorting'\n`);

    console.log(wordsJSONplaceholder);
}