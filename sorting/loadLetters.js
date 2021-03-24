const path = require('path');
const fs = require("fs");
let { allLetters } = require('../words/letter-arrays/master');

const rootPath = path.join(__dirname, '../');
const lettersPath = rootPath + 'words/letter-arrays/';

let alfa = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Æ", "Ø", "Å"];

fs.writeFile(lettersPath + 'A.json', JSON.stringify(['h', 'e', 'j'], null, 2), (err) => {
    if (err) throw err;
});