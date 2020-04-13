

// Word.js should only require Letter.js

// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
// An array of new Letter objects representing the letters of the underlying word
// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)

// 1. turn string into an array of letters
// 2. loop through our string to get each letter
// 3. turn into a letter object via new Letter
// 4. add to array in Word Constructor

var Letter = require("./Letter.js");

function Word (str){
    this.word = str.split("").map(function(char){
        return new Letter(char);
    });
    this.display = function(){
        return this.word.map(function(letters){
            return letters.guessHandler();
        }).join(" ");
    };
    this.check = function(char) {
        this.word.forEach(function(letters){
            letters.checkLetter(char);
        });
    };
};
// var x = new Word ("mom");
// console.log(x);

// console.log(x.display());
// x.check("m");
// console.log(x.display());

module.exports = Word;

