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

function randomAnimateVerticalObstacle() {
  obstacle1.style.top = `360px`;
  obstacle1.style.left = `${Math.floor(Math.random() * 320)}px`;
  console.log(Math.random() * 320 - 40);
  obstacle1.style.display = `block`;
  obstacle1.classList.add("animated-upwards");
}

function randomAnimateHorizontalObstacle() {
  obstacle2.style.top = `${Math.floor(Math.random() * 320)}px`;
  obstacle1.style.left = `360px`;
  obstacle2.style.display = block;
  obstacle2.classList.add("animated-right-to-left");
}


function collisionAlert() {
  let obstacleX = parseInt(
    window.getComputedStyle(obstacle1).getPropertyValue("left")
  );
  let obstacleY = parseInt(
    window.getComputedStyle(obstacle1).getPropertyValue("top")
  );
  console.log(obstacleX, xCoordinate);
  if (obstacleY > yCoordinate - 40 && obstacleY < yCoordinate && obstacleX > xCoordinate - 60 && obstacleX <= xCoordinate) {
    alert.textContent = `game over`;
    obstacle1.classList.remove("animated");
    obstacle1.classList.remove("visible");
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

// setInterval(() => {
//   collisionAlert();
// }, 10);

startButton.addEventListener("click", () => {
  setTimeout(() => 
  randomAnimateVerticalObstacle(), Math.floor(Math.random * 5000));
  setTimeout(() => 
  randomAnimateHorizontalObstacle(), Math.floor(Math.random * 5000))
});

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
