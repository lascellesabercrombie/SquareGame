let player = document.getElementById("player");
let board = document.getElementById("board");
let upButton = document.getElementById("up");
let downButton = document.getElementById("down");
let leftButton = document.getElementById("left");
let rightButton = document.getElementById("right");

function moveUp() {

  let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
  playerTop -= 40;
  player.style.top = `${playerTop}px`; 
  
}

function moveDown() {

  let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
  playerTop += 40;
  player.style.top = `${playerTop}px`; 
  
}

function moveLeft() {

  let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
  playerLeft -= 40;
  player.style.left = `${playerLeft}px`; 
  
}

function moveRight() {

  let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
  playerLeft += 40;
  player.style.left = `${playerLeft}px`; 
  
}

document.body.addEventListener('keydown', (e) => {
  const key = event.key
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
})

upButton.addEventListener("click", moveUp);
downButton.addEventListener("click", moveDown);
leftButton.addEventListener("click", moveLeft);
rightButton.addEventListener("click", moveRight);