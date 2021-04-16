// npm packages
const fs = require("fs");
const path = require('path');

let rootPath = path.join(__dirname, '../'); // Dansk-api-ordbog folder
let wordFilePath = rootPath + 'words/words.txt';

const clearWordsFile = () => {
    console.log(`\n==> Clearing of words.txt has started`);
    console.log(`==> Please wait...\n`);

    // Writes the file to '' empty string
    fs.writeFile(wordFilePath, '', (err) => {
        if(err) throw err;

        // Say when file has been writen/saved
        console.log(`\n==> Words.txt has been cleared successfully\n`);
    });
}

module.exports = { clearWordsFile };