// npm packages
const fs = require("fs");
const path = require('path');
// Own modules
const { clearWordsFile } = require('./clearWordFile');
const { Word } = require('../classes/Word');

let rootPath = path.join(__dirname, '../'); // Dansk-api-ordbog folder
let wordsFilePath = rootPath + 'words/word-files/wordList-1.txt';
let letterArraysPath = rootPath + 'words/letter-arrays/';

// Entry point — await the clear before doing anything else
async function run() {
    await clearWordsFile();
    await createWordsFile();
}

run();

async function createWordsFile() {
    console.log(`\n==> The creation of letter-arrays has started`);
    console.log(`==> Please wait...\n`);

    // Read the word list
    let rawData;
    try {
        rawData = fs.readFileSync(wordsFilePath, 'utf8');
    } catch (err) {
        console.error(`Failed to read word list: ${err.message}`);
        return;
    }

    // Split into individual words, filter empty lines
    const wordLines = rawData.split('\n').map(w => w.trim()).filter(w => w.length > 0);

    // Build a map of letter -> array of Word objects
    const letterMap = {};

    for (const wordStr of wordLines) {
        const letter = wordStr[0].toUpperCase();
        const wordObj = new Word(wordStr);

        if (!letterMap[letter]) {
            letterMap[letter] = [];
        }
        letterMap[letter].push(wordObj);
    }

    // Write each letter's array to its corresponding JSON file
    let written = 0;
    for (const [letter, words] of Object.entries(letterMap)) {
        const filePath = path.join(letterArraysPath, `${letter}.json`);
        try {
            fs.writeFileSync(filePath, JSON.stringify(words, null, 2), 'utf8');
            written++;
        } catch (err) {
            console.error(`Failed to write ${letter}.json: ${err.message}`);
        }
    }

    console.log(`\n==> Done! ${wordLines.length} words written across ${written} letter files.\n`);
}
