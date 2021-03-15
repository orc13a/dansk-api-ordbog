const fs = require("fs");
const path = require('path');
const { Word } = require('./classes');
const { convertSpecielChar } = require('./getFuncs');

let rootPath = path.join(__dirname);
let totalWordListPath = rootPath + '/words/total-word-list.txt';

let totalWordList = fs.readFileSync("./words/total-word-list.txt", "utf-8");
let totalWordListFile = totalWordList.split('\n');

let wordList1 = fs.readFileSync("./words/words-list-1.txt", "utf-8");
let words1FromFile = wordList1.split('\n');
let wordList2 = fs.readFileSync("./words/words-list-2.txt", "utf-8");
let words2FromFile = wordList2.split('\n');

let allWordListFiles = [words1FromFile, words2FromFile];

let firstLineSkipWord = '//--FirstLineSkip--//';

let rawWord;
let word;
let firstChar;
let newWord;

function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function clearWordList() {
    totalWordListFile = [];
    totalWordListFile.length = 0;

    createWordListeFile();
}

function createWordListeFile() {
    console.log(`==> Creating word list`);
    console.log(`==> Please wait...\n`);

    allWordListFiles.forEach(wordFile => {
        wordFile.forEach(rawWord => {        
            if (rawWord != firstLineSkipWord) {
                if (rawWord.includes('\r') === true) {
                    word = rawWord.split('\r')[0];
                } else {
                    word = rawWord;
                }
            }
            
            totalWordListFile.push(ucfirst(word));
        });
    });
    
    totalWordListFile.sort();
    let rawData = totalWordListFile.join('\n');
    
    fs.writeFile(totalWordListPath, rawData, (err) => {
        if(err) throw err;
    });

    console.log(`==> Word list created!\n`);
}

// createWordListeFile();
clearWordList();