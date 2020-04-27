// space for easier readability

// space for easier readability

var Letter = require("./Letter.js");

function Word (str){
    // creates the word object
    this.word = str.split("").map(function(char){
        return new Letter(char);
    });
    // displays the word / underlines
    this.display = function(){
        return this.word.map(function(letters){
            return letters.displayLetter();
        }).join(" "); // space between each letter or underscore for clarity
    };
    // returns the character or underscore
    this.check = function(char) {
        this.word.forEach(function(letters){
            letters.checkLetter(char);
            if (char === " ") {
                return " ";
            }
        });
    };
};
// var x = new Word ("mom");
// console.log(x);

// console.log(x.display());
// x.check("m");
// console.log(x.display());

module.exports = Word;