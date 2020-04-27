
// space for easier readability

var letters = /[a-zA-Z]/; // regular expression

function Letter (character) {
    this.character = character.toUpperCase();
    this.guess = false;
    this.displayLetter = function() {
        if(this.guess === false && (this.character.search(letters) !== -1)){
            return "_";
        } else {
            return this.character;
        };
    };
    this.checkLetter = function(char) {
        //!!! took out .toLowerCase after character and changed line 8 to upperCase to handle bug
        if(char === this.character) {  
            this.guess = true;
        };
    };
};

module.exports = Letter;