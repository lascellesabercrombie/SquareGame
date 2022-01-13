let player = document.getElementById("player");
let board = document.getElementById("board");
let upButton = document.getElementById("up");
let downButton = document.getElementById("down");
let leftButton = document.getElementById("left");
let rightButton = document.getElementById("right");

function moveUp() {
  let positionPlayer = parseInt(player.style.top);
  console.log(player.style.top);
  //   console.log(player.style.top + 40);
  player.style.top = `${player.style.top + 40}px`;
}
// ${player.style.top + 40}px"
upButton.addEventListener("click", moveUp);
