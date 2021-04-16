// npm packages
const fs = require("fs");
const path = require('path');
// Own modules
const { clearWordsFile } = require('./clearWordFile');

let rootPath = path.join(__dirname, '../'); // Dansk-api-ordbog folder
let wordsFilePath = rootPath + 'words/words.txt';

// First we clear the file
clearWordsFile();

// Read the letters JSON file
fs.readFile(wordsFilePath, (err, lettersArrayData) => {
    if (err) throw err;

    createWordsFile();
});

function createWordsFile() {
    console.log(`\n==> The creation of words.txt has started`);
    console.log(`==> Please wait...\n`);

    // ...

    console.log(`\n==> Words.txt has been created successfully\n`);
}