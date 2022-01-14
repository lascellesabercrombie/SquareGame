let player = document.getElementById("player");
let board = document.getElementById("board");
let upButton = document.getElementById("up");
let downButton = document.getElementById("down");
let leftButton = document.getElementById("left");
let rightButton = document.getElementById("right");

function moveUp() {

  let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
  console.log(playerTop)
  console.log(typeof playerTop)
  playerTop = playerTop - 40;
  console.log(playerTop)
  player.style.top = `${playerTop}px`; 
  
}

document.body.addEventListener('keydown', (e) => {
  const key = event.key
  switch (key) {
    case "ArrowUp":
    moveUp()
    break; 
    default:
    console.log("nope");
    break;
  }
})

// upButton.addEventListener("click", moveUp);

