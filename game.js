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

  //load palyer images
  const xImg = new Image();
  xImg.src = "./img/x.png";
  const oImg = new Image();
  oImg.src = "./img/o.png";

  //Win Combinations
  const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let GAME_OVER = false;
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
    //if the game over the game will stop
    if (GAME_OVER) return;
    //x & Y possition of mouse click relative to the canvas
    let X = event.clientX - canvas.getBoundingClientRect().x;
    let Y = event.clientY - canvas.getBoundingClientRect().y;

    //calculate i and j
    let i = Math.floor(Y / SPACE_SIZE);
    let j = Math.floor(X / SPACE_SIZE);
    //get the id of the space the player clicked on
    let id = board[i][j];

    //check that the space are already used or not
    if (gameData[id]) return;
    //store the player moves
    gameData[id] = currentPlayer;

    //draw the move on board
    drawOnBoard(currentPlayer, i, j);

    if (isWinner(gameData, currentPlayer)) {
      showGameOver(currentPlayer);
      GAME_OVER = true;
      return;
    }
    if (isTie(gameData)) {
      showGameOver("Tie");
      GAME_OVER = true;
      return;
    }
    //give turn to t he other player
    currentPlayer = currentPlayer == player.man ? player.friend : player.man;
  });

  const isWinner = (gameData, player) => {
    for (let i = 0; i < COMBOS.length; i++) {
      let won = true;
      for (let j = 0; j < COMBOS[i].length; j++) {
        let id = COMBOS[i][j];
        won = gameData[id] == player && won;
      }
      if (won) {
        return true;
      }
    }
    return false;
  };
  //check tie
  const isTie = (gameData) => {
    let isBoardfill = true;
    for (let i = 0; i < gameData.length; i++) {
      isBoardfill = gameData[i] && isBoardfill;
    }
    if (isBoardfill) {
      return true;
    }
    return false;
  };

  const showGameOver = (player) => {
    let message = player == "tie" ? "No Winner" : "The Winner is";
    let imgSrc = `./img/${player}.png`;
    console.log("player ", player);
    gameOver.innerHTML = `
       <h1>${message}</h1>
       <img class="winner-img" src="./img/${player}.png" </img>
       <div class="play-again" onclick="location.reload()">Play Again</div>
      `;
    gameOver.classList.remove("hide");
  };

  const drawOnBoard = (player, i, j) => {
    let img = player == "x" ? xImg : oImg;

    //draw image in the position of x and y based
    ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE, 150, 150);
  };
};
