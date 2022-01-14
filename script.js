let player = document.getElementById("player");
let board = document.getElementById("board");

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
  console.log(xCoordinate, yCoordinate);
}

document.body.addEventListener("keydown", (e) => {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      console.log("nope");
      break;
  }
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
