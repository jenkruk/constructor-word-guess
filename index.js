// REQUIRED word.js, inquirer & chalk
var Word  = require("./word.js");
var inquirer = require("inquirer");
var colors  = require("chalk");

var movies = [
    "The Terminator", 
    "National Lampoon’s Vacation",
    "The Little Mermaid",
    "Who Framed Roger Rabbit",
    "Gremlins",
    "Ghostbusters",
    "Batman",
    "Clue",
    "Beetlejuice",
    "Three Men and a Baby",
    "Honey, I Shrunk the Kids",
    "Coming to America",
    "Indiana Jones and the Temple of Doom",
    "Trading Places",
    "The Princess Bride",
    "Silverado",
    "Aliens",
    "Die Hard",
    "The Breakfast Club",
    "Steel Magnolias",
    "RoboCop",
    "The Shining",
    "The NeverEnding Story",
    "Raiders of the Lost Ark",
    "Big Trouble in Little China",
    "Pretty in Pink",
    "The Lost Boys"
    ];

var currentWord;
var alphabet = /[a-zA-Z]/; //This is using 'regex', or 'regular expression'
var guessesLeft = 5;
var guessedLetters = [];
var usedWords = [];
var firstGame = true;

// FUNCTION TO GENERATE A RANDOM WORD
function randomWord() {
    var selectedWord = movies[Math.floor(Math.random() * movies.length)];
    if(usedWords.indexOf(selectedWord) < 0){
        currentWord = new Word();
        currentWord.makeWord(selectedWord);
        usedWords.push(selectedWord);
    } else if(usedWords.length !== movies.length) {
        randomWord();
    }  else {
        console.log("There are no more movies left to guess!");
        playAgain();
    }
}

function wordGuessed(){
    var word = currentWord.wordArray;
    // LOOPS THROUGH THE WORD CHOICES ARRAY AND ANY UNGUESSED LETTERS
    for(var i = 0; i < word.length; i++){
        if(!word[i].guessed && word[i] !== " "){
            return false;
        }
    }
    // RETURN TRUE IF ALL THE LETTERS HAVE BEEN GUESSED
    return true;
}

// INQUIRER FUNCTION THAT PROMPTS THE USER FOR INPUT
function guessPrompt(){
    // IF ALL GUESSES HAVE BEEN USED UP, ALERT THE USER AND ASK IF THEY WANT TO PLAY AGAIN
    if (guessesLeft <= 0){
        console.log("Better luck next time!");
        playAgain();
    }
    // DISPLAY PROMPT IF THE WORD HAS NOT BEEN GUESSED
    else if(!wordGuessed()){
        // IF IT IS THE FIRST GAME, DISPLAY THE WORD AT THE START OF THE GAME
        if(firstGame){
        console.log("\r\nTry to guess the classic 80's movie!\r\n");
        currentWord.displayWord();
        firstGame = false;
        }
        // USE INQUIRER PROMPT TO ASK FOR USER INPUT
        inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: "Guess a letter: ",
                
                // VALIDATION FUNCTION FOR USER INPUT
                validate: function(input){
                    // CHECK IF USER HAS ALREADY GUESSED THIS LETTER
                    if(guessedLetters.indexOf(input.trim().toUpperCase()) >= 0){
                        console.log("\n\nYou have already guessed the letter " + (input.trim().toUpperCase()) + " Try again!\n\n");
                        return false;
                    }
                    // CHECK IF USER INPUT IS A SINGLE LETTER
                    else if(alphabet.test(input) && input.trim().length === 1){
                        return true;
                    }
                    // ASK USER TO CHOOSE A SINGLE LETTER IF THEY HAVEN'T FOLLOWED THE RULES
                    else{
                        console.log(" Please choose a single letter");
                        return false;
                    }
                }
            }
        ]).then(function(user){
            // CHECKS USER'S GUESS AND DISPLAY WORD
            currentWord.checkGuess(user.guess);
            currentWord.displayWord();
            // LET USER KNOW IF THEIR GUESS WAS CORRECT OR NOT
            if (currentWord.checkGuess(user.guess)){
                console.log("\n\nCORRECT!\n\n");
            }
            else{
                // DECREASE REMAINING GUESSES IF USER GUESS IS INCORRECT, DISPLAY GUESSES LEFT
                guessesLeft--;
                console.log("\n\nINCORRECT! You have " + guessesLeft + " guesses left!\n\n");
            }
            // STORE USER'S GUESS IN AN ARRAY SO IT CANNOT BE CHOSEN AGAIN
            guessedLetters.push(user.guess.trim().toUpperCase());
            guessPrompt();
    
        })
    }
    else{
        // IF USER HAS GUESSED THE WORD, LET THEM KNOW AND ASK THEM IF THEY WANT TO PLAY AGAIN
        console.log("\r\nYou won!\r\n");
        playAgain();
    }
}

// FUNCTION THAT ASKS USER IF THEY WANT TO PLAY AGAIN
function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to play again?",
            default: true
        }
    ]).then(function(user){
        // IF USER WANTS TO PLAY AGAIN, START THE GAME OVER WITH A NEW WORD
        if(user.confirm){
            firstGame = true;
            guessedLetters = [];
            guessesLeft = 10;
            randomWord();
            guessPrompt();
            if(usedWords.length === movies.length){
                usedWords = [];
            }
        }
        // END THE GAME IF THE USER DOES NOT WANT TO PLAY AGAIN
        else{
            console.log("Thank you for playing!");
        }
    })
}

randomWord();
guessPrompt();