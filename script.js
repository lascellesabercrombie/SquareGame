//variables from DOM

let player = document.getElementById("player");
let board = document.getElementById("board");
let obstacle1 = document.getElementById("obstacle1");
let obstacle2 = document.getElementById("obstacle2");

let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");

let upButton = document.getElementById("up");
let downButton = document.getElementById("down");
let leftButton = document.getElementById("left");
let rightButton = document.getElementById("right");

let alert = document.querySelector(".alert");
let timer = document.querySelector(".timer");

let URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonForm = document.querySelector("#pokemon-form");

//Functions to choose player character

function handlePlayer(picture, name) {
  document.querySelector("header").innerHTML = "";
  let playerImg = document.createElement("img");
  playerImg.src = picture;
  player.append(playerImg);
  let playerPokemon = document.createElement("span");
  playerPokemon.innerText = `Your pokemon is "${name}"`;
  document.querySelector("header").append(playerPokemon);
}

function handleSubmit(e) {
  e.preventDefault();
  let pokemon = new FormData(pokemonForm);
  let pokemonName = Object.fromEntries(pokemon);
  let pokemonUrl = URL + pokemonName.name;
  fetch(pokemonUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((pokemonInfo) => {
      let name = pokemonInfo.name;
      let picture = pokemonInfo.sprites.front_default;
      handlePlayer(picture, name);
    })
    .catch((error) => {
      if (error.message === "404") {
        document.querySelector(
          "header"
        ).innerText = `Can't find the "${pokemonName.name}"`;
      } else {
        console.error;
        document.querySelector("header").innerText = `${error}`;
      }
    });
}

pokemonForm.addEventListener("submit", handleSubmit);

//Player location and movement

let yCoordinate = parseInt(
  window.getComputedStyle(player).getPropertyValue("top")
);
let xCoordinate = parseInt(
  window.getComputedStyle(player).getPropertyValue("left")
);

function moveUp() {
  yCoordinate -= 40;
  player.style.top = `${yCoordinate}px`;
}

function moveDown() {
  yCoordinate += 40;
  player.style.top = `${yCoordinate}px`;
}

function moveLeft() {
  xCoordinate -= 40;
  player.style.left = `${xCoordinate}px`;
}

function moveRight() {
  xCoordinate += 40;
  player.style.left = `${xCoordinate}px`;
}

function xLimitAlert() {
  if (xCoordinate < 40) {
    xCoordinate = 0;
    player.style.left = "0px";
    alert.textContent = `you can't go further.`;
  } else if (xCoordinate > 360) {
    xCoordinate = 360;
    player.style.left = "360px";
    alert.textContent = `you can't go further.`;
  } else {
    alert.textContent = null;
  }
}
function yLimitAlert() {
  if (yCoordinate < 40) {
    yCoordinate = 0;
    player.style.top = "0px";
    alert.textContent = `you can't go further.`;
  } else if (yCoordinate > 360) {
    yCoordinate = 360;
    player.style.top = "360px";
    alert.textContent = `you can't go further.`;
  } else {
    alert.textContent = null;
  }
}

//Obstacle functions

function randomAnimateVerticalObstacle() {
  obstacle1.style.top = `360px`;
  obstacle1.style.left = `${Math.floor(Math.random() * 320)}px`;
  console.log(Math.random() * 320 - 40);
  obstacle1.style.display = `block`;
}

function randomAnimateHorizontalObstacle() {
  obstacle2.style.top = `${Math.floor(Math.random() * 320)}px`;
  obstacle2.style.left = `400px`;
  obstacle2.style.display = `block`;
}

//Collision

function collisionAlert() {
  let obstacleX = parseInt(
    window.getComputedStyle(obstacle1).getPropertyValue("left")
  );
  let obstacleY = parseInt(
    window.getComputedStyle(obstacle1).getPropertyValue("top")
  );
  // console.log(obstacleX, xCoordinate);
  if (
    obstacleY > yCoordinate - 40 &&
    obstacleY < yCoordinate &&
    obstacleX > xCoordinate - 60 &&
    obstacleX <= xCoordinate
  ) {
    alert.textContent = `game over`;
    stopAnimate();
    stopScoring();
  }
}

//Animation of obstacles

let verticalInterval;
let horizontalInterval;

function animate() {
  verticalInterval = setInterval(() => {
    animateVertical();
  }, 3000);
  horizontalInterval = setInterval(() => {
    animateHorizontal();
  }, 4000);
}

function stopAnimate() {
  clearInterval(verticalInterval);
  clearInterval(horizontalInterval);
  verticalInterval = null;
  horizontalInterval = null;
}

function animateVertical() {
  randomAnimateVerticalObstacle();
  if (obstacle1.classList.contains("animated-upwards")) {
    obstacle1.classList.remove("animated-upwards");
  } else {
    obstacle1.classList.add("animated-upwards");
  }
}

function animateHorizontal() {
  randomAnimateHorizontalObstacle();
  if (obstacle2.classList.contains("animated-right-to-left")) {
    obstacle2.classList.remove("animated-right-to-left");
  } else {
    obstacle2.classList.add("animated-right-to-left");
  }
}

//Functions to keep score

let counter = 0;
let perSecond;

function scoreKeeper() {
  counter++;
  console.log(counter);
  timer.textContent = counter;
}

function scoreBySecond() {
  perSecond = setInterval(() => {
    scoreKeeper();
  }, 1000);
}

function stopScoring() {
  clearInterval(perSecond);
  perSecond = null;
}

function stopObstacles() {
  obstacle1.classList.remove("animated-upwards");
  obstacle1.style.display = `none`;
  obstacle2.classList.remove("animated-right-to-left");
  obstacle2.style.display = "none";
}

setInterval(() => {
  collisionAlert();
}, 10);

//Event listeners

document.body.addEventListener("keydown", (e) => {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      moveUp();
      yLimitAlert();
      break;
    case "ArrowDown":
      moveDown();
      yLimitAlert();
      break;
    case "ArrowLeft":
      moveLeft();
      xLimitAlert();
      break;
    case "ArrowRight":
      moveRight();
      xLimitAlert();
      break;
    default:
      console.log("nope");
      break;
  }
});

startButton.addEventListener("click", animateVertical);
startButton.addEventListener("click", animate);
startButton.addEventListener("click", scoreBySecond);
stopButton.addEventListener("click", stopAnimate);
stopButton.addEventListener("click", stopObstacles);
stopButton.addEventListener("click", stopScoring);

upButton.addEventListener("click", () => {
  moveUp();
  yLimitAlert();
});
downButton.addEventListener("click", () => {
  moveDown();
  yLimitAlert();
});
leftButton.addEventListener("click", () => {
  moveLeft();
  xLimitAlert();
});
rightButton.addEventListener("click", () => {
  moveRight();
  xLimitAlert();
});
