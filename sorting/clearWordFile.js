// npm packages
const fs = require("fs");
const path = require('path');

let rootPath = path.join(__dirname, '../'); // Dansk-api-ordbog folder
let letterArraysPath = rootPath + 'words/letter-arrays/';
let lettersFilePath = rootPath + 'words/letters.json';

const clearWordsFile = () => {
    console.log(`\n==> Clearing of letter-arrays has started`);
    console.log(`==> Please wait...\n`);

    return new Promise((resolve, reject) => {
        const letters = JSON.parse(fs.readFileSync(lettersFilePath, 'utf8'));

        let cleared = 0;
        for (const letter of letters) {
            const filePath = path.join(letterArraysPath, `${letter}.json`);
            try {
                fs.writeFileSync(filePath, '[]', 'utf8');
                cleared++;
            } catch (err) {
                return reject(err);
            }
        }

        console.log(`\n==> ${cleared} letter-array files cleared successfully\n`);
        resolve();
    });
}

module.exports = { clearWordsFile };
