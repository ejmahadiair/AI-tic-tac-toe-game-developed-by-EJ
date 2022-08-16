//select the elemnets
const options = document.querySelector(".options");
const gameOver = document.querySelector(".gameover");

//select all the buttons
const computerBtn = document.querySelector(".computer");
const friendBtn = document.querySelector(".friend");
const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
const playBtn = document.querySelector(".play");

//some variables to store user options
let OPONENT;
//declare an object
// const player = {};
//declare this way alos
const player = new Object();

//Add Event Istner to every button
computerBtn.addEventListener("click", () => {
  OPONENT = "computer";
  switchActive(friendBtn, computerBtn);
});
friendBtn.addEventListener("click", () => {
  OPONENT = "friend";
  switchActive(computerBtn, friendBtn);
});
xBtn.addEventListener("click", () => {
  player.man = "x";
  player.computer = "o";
  player.friend = "o";
  switchActive(oBtn, xBtn);
});
oBtn.addEventListener("click", () => {
  player.man = "o";
  player.computer = "x";
  player.friend = "x";
  switchActive(xBtn, oBtn);
});
playBtn.addEventListener("click", () => {
  if (!OPONENT) {
    computerBtn.classList.add("unselect");
    friendBtn.classList.add("unselect");
    return;
  }
  if (!player.man) {
    xBtn.classList.add("unselect");
    oBtn.classList.add("unselect");
    return;
  }
  play(player, OPONENT);
  options.classList.add("hide");
});
//switch active class between to elements
const switchActive = (off, on) => {
  off.classList.remove("active");
  on.classList.add("active");
  computerBtn.classList.remove("unselect");
  friendBtn.classList.remove("unselect");
  xBtn.classList.remove("unselect");
  oBtn.classList.remove("unselect");
};
