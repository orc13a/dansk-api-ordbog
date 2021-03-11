const fs = require("fs");
const path = require('path');

let rootPath = path.join(__dirname);
let allWordsPath = rootPath + '/words/words.json';
let ASCIIpath = rootPath + '/words/ASCII-sheet.json';

let allWords;
let ASCIIsheet;

let insertingArr = [];

let wordList1 = fs.readFileSync("./words/words-list-1.txt", "utf-8");
let wordsFromFile = wordList1.split('\n');

fs.readFile(allWordsPath, (err, data) => {
    if (err) throw err;

    allWords = JSON.parse(data);

    fs.readFile(ASCIIpath, (err, data2) => {
        if (err) throw err;
    
        ASCIIsheet = JSON.parse(data2);
        
        sort('a');
    });
});

let start = true;
let firstChar = '';
let secondChar = '';

function sort(letter) {
    console.log(`==> Sorting for '${letter}' has started`);
    var letterArr = allWords[letter.toUpperCase()];
    insertingArr = [];

    console.log(`==> Please wait...\n`);
    for (let w = 0; w < wordsFromFile.length; w++) {
        var rawWord = wordsFromFile[w];
        firstChar = rawWord.charAt(0);
        secondChar = rawWord.charAt(1);
        var word = '';

        if (firstChar != letter.toUpperCase()) {
            break;
        }

        if (rawWord.includes('\r')) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }

        if (letter.toLowerCase() != 'å') {
            var calIndex = calASCII(word, insertingArr);
            console.log(word);
            console.log(calIndex);
            if (secondChar != 'a' || secondChar != 'A') {
                if (letterArr[calIndex] === undefined) {
                    letterArr[calIndex] = [];
                    insertingArr[calIndex] = [];

                    // letterArr[calIndex].push(word);
                    // insertingArr[calIndex].push(word);
                } else {
                    // letterArr[calIndex].push(word);
                    // insertingArr[calIndex].push(word);
                }
            }
        } else {

        }
    }
    
    let rawData = JSON.stringify(allWords, null, 2);
    
    fs.writeFile(allWordsPath, rawData, (err) => {
        if(err) throw err;
    });

    console.log(`==> Finish sorting for '${letter}'\n`);
}

function calASCII(word, array) {
    var wordSplitted = word.split('');
    var letterASCIIsum = 0;
    var arrLen;
    
    if (array.length != 0) {
        arrLen = array.length;
    } else {
        arrLen = 1;
    }

    wordSplitted.forEach(letter => {
        letterASCIIsum += ASCIIsheet[letter];
    });
    
    return letterASCIIsum % arrLen;
}