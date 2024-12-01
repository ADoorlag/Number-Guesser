//game values
let min = 1,
  max = 99,
  winningNumber = getRandomNum(min, max),
  guessesLeft = 5;

//UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    return false;
  }

  //check if won
  if (guess === winningNumber) {
    //game over, won
    /*//disable input
    guessInput.disable = true;
    //change border color
    guessInput.style.borderColor = "green";
    //set message
    setMessage(`${winningNumber} is correct!`, "green");*/

    gameOver(true, `${winningNumber} is correct!`);
  } else {
    //wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //game over, lost
      /*//disable input
      guessInput.disabled = true;
      //change border color
      guessInput.style.borderColor = "red";

      setMessage(
        `Game Over, you lost. The correct number was ${winningNumber}`,
        "red"
      );*/
      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNumber}`
      );
    } else {
      //game continues, answer wrong

      //change border color
      guessInput.style.borderColor = "red";
      //clear input
      guessInput.value = "";
      //tell user their guesses left
      setMessage(
        `${guess} is not correct. You have ${guessesLeft} guesses left`,
        "red"
      );
    }
  }
});

//game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "Red");

  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;
  //clear input
  guessInput.value = "";
  //set message
  setMessage(msg);

  //play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

//get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
