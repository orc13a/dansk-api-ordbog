const fs = require("fs");
const path = require('path');

let rootPathForValues = path.join(__dirname);
// let ASCIIpathForGetValues = rootPathForValues + '/words/ASCII-chars.txt';
let ASCIIpathForSetValues = rootPathForValues + '/words/ASCII-sheet.json';

let ASCIIsheetSetValues;
let ASCIIsheetGetValues;
let value = 32;

let finishedAsciiObj = {};

let ASCIIpathForGetValues = fs.readFileSync("./words/ASCII-chars.txt", "utf-8");
let ASCIIcharFile = ASCIIpathForGetValues.split('\n');

fs.readFile(ASCIIpathForSetValues, (err, data) => {
    if (err) throw err;

    ASCIIsheetSetValues = JSON.parse(data);
    
    addValues();
});

function addValues() {
    console.log(`==> Setting values`);
    
    for (let c = 0; c < ASCIIcharFile.length; c++) {
        var rawChar = ASCIIcharFile[c];
        var char = '';

        if (rawChar.includes('\r')) {
            char = rawChar.split('\r')[0];
        } else {
            char = rawChar;
        }

        finishedAsciiObj[char] = value;
        value++;
    }

    let rawData = JSON.stringify(finishedAsciiObj, null, 2);
    
    fs.writeFile(ASCIIpathForSetValues, rawData, (err) => {
        if(err) throw err;
    });

    console.log(`==> Finish setting ASCII values\n`);
}