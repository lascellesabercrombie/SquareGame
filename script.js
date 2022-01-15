let player = document.getElementById("player");
let board = document.getElementById("board");
let obstacle1 = document.getElementById("obstacle1")

let startButton = document.getElementById("start")
let upButton = document.getElementById("up");
let downButton = document.getElementById("down");
let leftButton = document.getElementById("left");
let rightButton = document.getElementById("right");

let alert = document.querySelector(".alert");

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
  }
  else {alert.textContent = null;}
  console.log(xCoordinate, yCoordinate);
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
  }
  else {alert.textContent = null;}
  console.log(xCoordinate, yCoordinate);
}

function animateObstacle() {
obstacle1.classList.add("visible")
obstacle1.classList.add("animated")
}

function collisionAlert () {
  let obstacleX = parseInt(
    window.getComputedStyle(obstacle1).getPropertyValue("left"));
  let obstacleY = parseInt(
    window.getComputedStyle(obstacle1).getPropertyValue("top"));
  console.log(obstacleX);
  console.log(obstacleY);
  if (obstacleY > yCoordinate - 40 && obstacleY < yCoordinate && obstacleX > xCoordinate - 60 && obstacleX <= xCoordinate) {
  
    alert.textContent = `game over`
    obstacle1.classList.remove("animated")
    obstacle1.classList.remove("visible")
  }
}

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

setInterval(collisionAlert, 10)

startButton.addEventListener("click", animateObstacle)

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
