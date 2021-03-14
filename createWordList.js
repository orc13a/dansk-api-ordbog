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

let rawWord;
let word;

function createWordListeFile() {
    console.log(`==> Creating word list`);
    console.log(`==> Please wait...\n`);

    allWordListFiles.forEach(pushWord => {
        rawWord = pushWord;

        if (rawWord.includes('\r') === true) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }

        totalWordListFile.push(word);
    });

    let rawData = totalWordListFile.join('\n');
        
    fs.writeFile(totalWordListPath, rawData, (err) => {
        if(err) throw err;
    });

    console.log(`==> Word list created!\n`);
}

createWordListeFile();