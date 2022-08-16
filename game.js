const play = (player, oponent) => {
  //select canvas
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");
  //
  //Board variables
  let board = [];
  const COLUMN = 3;
  const ROW = 3;

  const SPACE_SIZE = 150;

  let gameData = new Array(9);
  let currentPlayer = player.man;

  //DRAW THE BOARD
  function drawBoard() {
    let id = 0;
    for (let i = 0; i < ROW; i++) {
      board[i] = [];
      for (let j = 0; j < COLUMN; j++) {
        board[i][j] = id;
        id++;
        ctx.strokeStyle = "white";
        ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
      }
    }
  }
  drawBoard();
  //On player's Click
  canvas.addEventListener("click", () => {
    //x & Y possition of mouse click relative to the canvas
    let X = event.clientX - canvas.getBoundingClientRect().x;
    let Y = event.clientY - canvas.getBoundingClientRect().y;

    //calculate i and j
    let i = Math.floor(Y / SPACE_SIZE);
    let j = Math.floor(X / SPACE_SIZE);
    //get the id of the space the player clicked on
    let id = board[i][j];
    //store the player moves
    gameData[id] = currentPlayer;

    //give turn to t he other player
    currentPlayer = currentPlayer == player.man ? player.friend : player.man;
  });
};
