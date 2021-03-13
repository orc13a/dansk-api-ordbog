const fs = require("fs");
const path = require('path');
const { Word } = require('./classes');
const { calASCII } = require('./getFuncs');

let rootPath = path.join(__dirname);
let allWordsPath = rootPath + '/words/words.json';

let allWords;

let allSortingLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å'];
let theWords = [];

let wordList1 = fs.readFileSync("./words/words-list-1.txt", "utf-8");
let words1FromFile = wordList1.split('\n');
let wordList2 = fs.readFileSync("./words/words-list-2.txt", "utf-8");
let words2FromFile = wordList2.split('\n');

fs.readFile(allWordsPath, (err, data) => {
    if (err) throw err;

    allWords = JSON.parse(data);

    // sort('b');
    // sortAll(words1FromFile);
    sortNoAlfa(words2FromFile);
});

let firstChar = '';
let secondChar = '';

function sortAll(filePath, sortFunc) {
    allSortingLetters.forEach(letter => {
        sort(letter, filePath);
    });

    console.log(`\n\n==> Successfully sorted all letters\n`);
}

let startIndex = 0;
let rawWord = '';
let word = '';
let calIndex;

function sort(letter, wordsFromFile) {
    console.log(`==> Sorting for '${letter}' has started`);
    var letterArr = allWords[letter.toUpperCase()];

    console.log(`==> Please wait...\n`);
    for (let w = 0; w < wordsFromFile.length; w++) {
        rawWord = wordsFromFile[w];

        if (rawWord.includes('\r')) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }

        if (word.charAt(0) === letter.toUpperCase()) {
            startIndex = w;
            break;
        }
    }

    for (let w = startIndex; w < wordsFromFile.length; w++) {
        rawWord = wordsFromFile[w];
        
        if (rawWord.includes('\r')) {
            word = rawWord.split('\r')[0];
        } else {
            word = rawWord;
        }
        
        firstChar = word.charAt(0);
        secondChar = word.charAt(1);
        
        if (firstChar != letter.toUpperCase()) {
            break;
        }

        if (letter.toLowerCase() != 'å') {
            if (firstChar == 'A') {
                if (secondChar != 'A' && secondChar != 'a') {
                    theWords.push(word);
                }
            } else {
                theWords.push(word);
            }
        } else {
            if (firstChar === 'A' && secondChar === 'a') {
                theWords.push(word);
            }
        }
    }
    

    for (let i = 0; i < theWords.length; i++) {
        letterArr[i] = [];
    }


    for (let i = 0; i < theWords.length; i++) {
        calIndex = calASCII(theWords[i], theWords);

        letterArr[calIndex].push(new Word(theWords[i]));
    }
    
    let rawData = JSON.stringify(allWords, null, 2);
    
    fs.writeFile(allWordsPath, rawData, (err) => {
        if(err) throw err;
    });

    console.log(`==> Finish sorting for '${letter}'\n`);
}

function sortNoAlfa(wordsFromFile) {
    console.log(`==> Please wait...\n`);

    for (let w = startIndex; w < wordsFromFile.length; w++) {
        rawWord = wordsFromFile[w];
        
        var wordFirstChar = rawWord.split('')[0];
        console.log(allWords[wordFirstChar]);
    }
    
    // let rawData = JSON.stringify(allWords, null, 2);
    
    // fs.writeFile(allWordsPath, rawData, (err) => {
    //     if(err) throw err;
    // });

    console.log(`==> Finish sorting\n`);
}