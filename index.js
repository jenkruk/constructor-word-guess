
// space for easier readability


// REQUIRED word.js, inquirer
var Word  = require("./word.js");
var inquirer = require("inquirer");
var chalk = require("chalk");

var randomWord;
var remaining = 7;
var guessedLetters = [];

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
    
    function start() {
    remaining = 7;
    guessedLetters = [];
    console.log(chalk.blue("\nTry to guess the classic '80's movie!"));
    if(movies.length > 0){
        // randomly pick a word from the movie array
        var randomIndex = Math.floor(Math.random() * movies.length);
        randomWord = movies[randomIndex];
        movies.splice(randomIndex, 1);
        // console.log(movies);
        // console.log(randomWord);

        // turn the movie into a word object using the Word Constructor
        randomWord = new Word(randomWord);
        // console.log(randomWord);

        // display the underscores for the random chosen movie (in Word Constructor)
        console.log("\n", randomWord.display(), "\n")
        askUser();
        } else {
            console.log("\nThere are no more movies left to guess.  Game over.");
        }
    };

    function playAgain(){
        inquirer
        .prompt([
            {name: "playAgain",
            type: "confirm",
            message: chalk.magenta("Would you like to play again?\n "),
        }
        ]).then(function(answer){
            // console.log(answer.playAgain);
            if (answer.playAgain) {
                start();
            } else {
                console.log(chalk.blueBright("\nGame Over. Thanks for playing!\n"));
            }
        });
    };

    // prompt the user to pick a letter
    function askUser(){
        inquirer
        .prompt([
            {name: "userInput",
            type: "input",
            message: chalk.magenta("Guess a letter: "),
        }
        ]).then(function(answer){
            // create a variable for the users input for ease of calling later
            // in the Letter constructor - also changed the character (line 8 to upperCase)
            // !!! This was toLowerCase as was character (line 19) in the letter constructor
            var userInput = answer.userInput.toUpperCase(); 

            // If the user's input is already in the guessedLetters array, alert user that they have already guessed that letter
            // Prompt the user to pick another letter
            if (guessedLetters.includes(userInput)){
                console.log("\nYou've already guessed the letter " + chalk.red(userInput.toUpperCase()), "Try again!\n");
                askUser();
            } else {
            // add the letter from the userInput into the guessedLetters array
            guessedLetters.push(userInput);

            // check whether the letter is correct or not (using checkLetter from the Word Constructor - which gets it from Letter.js)
            randomWord.check(userInput);

            // if the letter is correct, display it
            var display = randomWord.display();
            console.log("\n", display);

            // handle incorrect guess
            if(!display.includes(userInput)){
                remaining--;
                // keep track of the number of guesses left
                console.log(chalk.yellow("\nINCORRECT! "), chalk.green("You have", remaining, "guesses left!\n"));
            }
            // handle correct guess 
            else {
                console.log(chalk.cyan("\nCORRECT!\n"));
            }
            // handle win
            if(!display.includes("_")) {
                console.log(chalk.greenBright("You Won!\n"));
                playAgain();
            } else if (remaining > 0) {
                askUser();
            } 
            else {
            // handle loss
                console.log(chalk.blue("Better Luck Next Time!\n"));
                playAgain();
            };
        };
        });
    };
    start();