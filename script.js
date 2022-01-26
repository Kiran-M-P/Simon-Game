const levelTittle = document.querySelector("#level-title");
const allButtons = document.querySelectorAll(".btn");
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

document.addEventListener("keydown", function () {
  if (!started) {
    levelTittle.innerHTML = "Level " + level;
    nextSequence();
    started = true;
  }
});

levelTittle.addEventListener("click", function () {
  if (!started) {
    levelTittle.innerHTML = "Level " + level;
    nextSequence();
    started = true;
  }
});

// Adding click event to buttons
allButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const userChosenColor = button.getAttribute("id");
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
  });
});

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userPattern[currentlevel]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    new Audio("sounds/wrong.mp3").play();
    document.querySelector("body").classList.add("game-over");
    levelTittle.innerHTML = "Game Over,Tap here or Press Any Key to Restart ";
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  userPattern = [];
  level++;
  levelTittle.innerHTML = "Level " + level;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChoseColor = buttonColors[randomNumber];
  gamePattern.push(randomChoseColor);
  animatePress(randomChoseColor);
  playSound(randomChoseColor);
}

function animatePress(button) {
  const clickedButton = document.getElementById(button);
  clickedButton.classList.add("pressed");
  setTimeout(function () {
    clickedButton.classList.remove("pressed");
  }, 100);
}

function playSound(button) {
  const sound = new Audio("sounds/" + button + ".mp3");
  sound.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
    started = false;
}
