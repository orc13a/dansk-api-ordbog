// npm packages
const fs = require("fs");
const path = require('path');

// Dansk-api-ordbog folder
let rootPath = path.join(__dirname, '../');

// The JSON with all the letters
let lettersPath = rootPath + 'words/letters.json';
// The root folder of the letter JSON files
let letterPath = rootPath + 'words/letter-arrays/';

// Read the letters JSON file
fs.readFile(lettersPath, (err, lettersArrayData) => {
    if (err) throw err;

    // Run when read the file and send the array
    clearLetterArrays(JSON.parse(lettersArrayData));
});

function clearLetterArrays(letters) {
    console.log(`\n==> The cleaning of has started`);
    console.log(`==> Please wait...\n`);

    // For each letter
    letters.forEach(letter => {
        // Clear array
        let resetArray = [];

        // Stringify the array
        let rawData = JSON.stringify(resetArray, null, 2);

        // Full path the the letter JSON
        var pathForLetter = letterPath + letter + '.json';

        // Write/save the letter JSON file
        fs.writeFile(pathForLetter, rawData, (err) => {
            if(err) throw err;

            // Say when file has been writen/saved
            console.log(`${letter} array has been cleared!`);
        });
    });

    console.log(`\n==> All files has been clear successfully\n`);
}