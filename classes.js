class Word {
    constructor(word, wordClass, wordInflection) {
        this.word = word;
        this.word_upperCase = word.toUpperCase();
        this.word_lowerCase = word.toLowerCase();
        this.word_classes = []; // ordet ordklasse
        this.word_inflections = []; // inflection = bøjning
        this.word_meaning_url = `https://ordnet.dk/ddo/ordbog?query=${this.word}`;

        // Only push if paramater is given
        if (wordClass != undefined && wordClass.length > 0) {
            wordClass.forEach(wClass => {
                this.word_classes.push(wClass);
            });
        }

        if (wordInflection != undefined && wordInflection.length > 0) {
            wordInflection.forEach(inflection => {
                if (!inflection.includes('-')) {
                    var wordS = inflection.split('');
                    wordS.unshift('-');

                    this.word_inflections.push(wordS.join(''));
                } else {
                    this.word_inflections.push(inflection);
                }
            });
        }
    }
}

module.exports = {
    Word
};