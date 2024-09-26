/*
   Scripts to update HTML and CSS for Guess The Number game.
*/

let headingColour = "#2F5496";
let headingColourWin = "green";
let headingColourLose = "red";
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guessesHeading = document.querySelector(".guessesHeading");
const guesses = document.querySelector(".guesses");
const lastResultHeading = document.querySelector(".lastResultHeading");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;
guessField.focus();

// The check guess method to action it all
function checkGuess() {

   if (guessField.value === "") {
      return;
   }

   const userGuess = Number(guessField.value);

   if (guessCount === 1) {
      guessesHeading.textContent = "Your guesses:"
      guesses.textContent = `${userGuess}`;
      lastResultHeading.textContent = "Your results:"
   }
   else {
      if (guesses.textContent.search(`(^| )${guessField.value}($|,)`) > -1) {
         window.alert(`You already guessed ${userGuess}.`);
         guessField.value = "";
         guessField.focus();
         return;
      }
      guesses.textContent = `${guesses.textContent}, ${userGuess}`;
   }

   if (userGuess === randomNumber) {
      lastResult.textContent = "Congrats! You got it right!";
      changeHeadingColours("h2", headingColourWin);
      lowOrHi.textContent = "";
      setGameOver();
   } else if (guessCount === 5) {
      lastResult.textContent = `Game over! You took too many attempts. The number was ${randomNumber}!`;
      changeHeadingColours("h2", headingColourLose);
      lowOrHi.textContent = "";
      setGameOver();
   } else {
      lastResult.textContent = "Not yet, buddy. Keep guessing!";
      lowOrHi.textContent = "Last guess was too " + (userGuess > randomNumber ? "high" : "low") + "...";
   }

   guessCount++;
   guessField.value = "";
   guessField.focus();
}

// Add the click event listener to Submit button
guessSubmit.addEventListener("click", checkGuess);

// Add the keyboard event listener to the input field
guessField.addEventListener("keypress", function (event) {
   if (event.key === "Enter") {
      guessSubmit.click();
   }
});

// Dynamically add reset game button
function setGameOver() {
   guessField.disabled = true;
   guessSubmit.disabled = true;

   resetButton = document.createElement("button");
   resetButton.textContent = "Play again.";
   resetButton.style.margin = "5px 0px";
   resetButton.className = "reset"

   document.getElementById("footer").appendChild(resetButton);
   //document.body.append(resetButton);

   resetButton.addEventListener("click", resetGame)
}

// Reset the game to beginning.
function resetGame() {
   guessCount = 1;

   clearTextContent(".resultParas p");
   clearTextContent(".resultParas h2");

   resetButton.parentNode.removeChild(resetButton);

   guessField.disabled = false;
   guessSubmit.disabled = false;
   guessField.value = "";
   guessField.focus();

   changeHeadingColours("h2", headingColour);

   randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Change the colours behind all heading elements
function changeHeadingColours(classString, colour) {
   const elements = document.querySelectorAll(classString);
   for (const el of elements) {
      el.style.color = colour;
   }
}

// Change the text content for all elements to blank
function clearTextContent(classString) {
   const elements = document.querySelectorAll(classString);
   for (const el of elements) {
      el.textContent = "";
   }
}
