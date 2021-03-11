const fs = require("fs");
const path = require('path');

let rootPathForValues = path.join(__dirname);
let ASCIIpathForValues = rootPathForValues + '/words/ASCII-sheet.json';

let ASCIIsheetForValues;
let value = 32;

fs.readFile(ASCIIpathForValues, (err, data) => {
    if (err) throw err;

    ASCIIsheetForValues = JSON.parse(data);
    
    addValues();
});

function addValues() {
    console.log(`==> Setting values`);
    
    // for (const ascii in ASCIIsheetForValues) {
    //     console.log(ascii);
    //     // ASCIIsheetForValues[ascii] = value;
    //     // value++;
    // }

    let keys = Object.keys(ASCIIsheetForValues);
    for (let key of keys) {
        let v = key;
        console.log(v);
    }

    // let rawData = JSON.stringify(ASCIIsheetForValues, null, 2);
    
    // fs.writeFile(ASCIIpathForValues, rawData, (err) => {
    //     if(err) throw err;
    // });

    console.log(`==> Finish setting ASCII values\n`);
}