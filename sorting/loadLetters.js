const path = require('path');
const fs = require("fs");

const rootPath = path.join(__dirname, '../');
const lettersPath = rootPath + 'words/letter-arrays/';

let alfa = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Æ", "Ø", "Å"];

let allLetters = {};

const loadLetters = () => {
    for (let l = 0; l < alfa.length; l++) {
        let letter = alfa[l];

        fs.readFile(`${lettersPath}${letter}.json`, (err, data) => {
            if (err) throw err;

            allLetters[letter] = JSON.parse(data)[letter];

            console.log(allLetters);
        });
    }

    //console.log(allLetters);
}

loadLetters();