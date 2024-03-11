const squareOne = document.getElementById('grid-square-1');
const squareTwo = document.getElementById('grid-square-2');
const squareThree = document.getElementById('grid-square-3');
const squareFour = document.getElementById('grid-square-4');
const squareFive = document.getElementById('grid-square-5');
const squareSix = document.getElementById('grid-square-6');
const squareSeven = document.getElementById('grid-square-7');
const squareEight = document.getElementById('grid-square-8');
const squareNine = document.getElementById('grid-square-9');

const allSquares = document.querySelectorAll('.grid-square');

const playerOneScore = document.getElementById('info-player-score1');
const playerTwoScore = document.getElementById('info-player-score2');

const infoText = document.getElementById('instructions-text');
const startGameButton = document.getElementById('instructions-btn');

const modal = document.getElementById('modal');

const players = {
  playerOne: {name: 'Jack', wins: 0},
  playerTwo: {name: 'Jill', wins: 0}
};

let move = 1;
let nextPlayer = players.playerOne.name;
let pastPlayer;
let currentImage = 'cross';
let playerHasWon = false;

function addSquareClick() {
  allSquares.forEach((square) => {
    square.addEventListener('click', squareClick)
  });
}

function removeSquareClick() {
  allSquares.forEach((square) => {
    square.removeEventListener('click', squareClick)
  });
}

function squareClick() {
  if (!this.classList.contains('cross') && !this.classList.contains('circle')) {
    this.classList.add(`${currentImage}`);
    incrementMove();
  }
}

addSquareClick();

function incrementMove() {
  move += 1;
  // if move is not divisible by 2, it means move is an odd number.
  if (move % 2 !== 0) {
    nextPlayer = players.playerOne.name;
    pastPlayer = players.playerTwo.name;
    currentImage = 'cross';
    infoText.innerHTML = `${players.playerOne.name}'s turn`;
  } else {
    nextPlayer = players.playerTwo.name;
    pastPlayer = players.playerOne.name;
    currentImage = 'circle';
    infoText.innerHTML = `${players.playerTwo.name}'s turn`;
  }
  checkForWin();
  checkForTie();
}

function checkForWin() {
  const lines = [
    [squareOne, squareTwo, squareThree],
    [squareFour, squareFive, squareSix],
    [squareSeven, squareEight, squareNine],
    // vertical
    [squareOne, squareFour, squareSeven],
    [squareTwo, squareFive, squareEight],
    [squareThree, squareSix, squareNine],
    // diagonal
    [squareOne, squareFive, squareNine],
    [squareThree, squareFive, squareSeven]
  ];
  for (const line of lines) {
    const hasCross = line.every((square) =>
      square.classList.contains('cross')
    );
    const hasCircle = line.every((square) =>
      square.classList.contains('circle')
    );
    if (hasCross || hasCircle) {
      // if hasCross is true, the winner is playerOne. if hasCross return false, the winner is playerTwo.
      const winner = hasCross ? players.playerOne : players.playerTwo;
      winner.wins += 1;
      updateScores();
      playerWon();
      return;
    }
  }
}

function updateScores() {
  playerOneScore.innerHTML = players.playerOne.wins;
  playerTwoScore.innerHTML = players.playerTwo.wins;
}

function playerWon() {
  infoText.innerHTML = `${pastPlayer} won!`;
  playerHasWon = true;
  continueGame();
}

function checkForTie() {
  const squares = [
    squareOne,
    squareTwo,
    squareThree,
    squareFour,
    squareFive,
    squareSix,
    squareSeven,
    squareEight,
    squareNine
  ];

  const allSquaresFilled = squares.every((square) => {
    return (
      square.classList.contains('cross') || square.classList.contains('circle')
    );
  });

  if (allSquaresFilled && !playerHasWon) {
    infoText.innerHTML = "It's a tie!"
    continueGame();
  }
}

function continueGame() {
  removeSquareClick();
  setTimeout(() => {
    reset();
  }, 3000);
}

function restartGame() {
  removeSquareClick();
  reset();
}

function reset() {
  allSquares.forEach((square) => {
    square.classList = 'grid-square';
  });
  addSquareClick();
  playerHasWon = false;
  infoText.innerHTML = `${nextPlayer}'s turn to start`;
}

function startGame() {
  startGameButton.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const player1Input = document.getElementById('player1')
      .value.trim()
      .toLowerCase();
    const player2Input = document.getElementById('player2')
      .value.trim()
      .toLowerCase();

    const player1InputCap = 
      player1Input.charAt(0).toUpperCase() + player1Input.slice(1);
    const player2InputCap = 
      player2Input.charAt(0).toUpperCase() + player2Input.slice(1);

    players.playerOne.name = player1InputCap;
    players.playerTwo.name = player2InputCap;
    nextPlayer = player1InputCap;

    document.getElementById('info-player-name1').innerHTML = players.playerOne.name;
    document.getElementById('info-player-name2').innerHTML = players.playerTwo.name;

    players.playerOne.wins = 0;
    players.playerTwo.wins = 0;
    updateScores();

    infoText.innerHTML = `${players.playerOne.name}'s turn to start`
    modal.style.display = 'none';

    startGameButton.innerHTML = 'Restart Game';
    addSquareClick();
    restartGame();
  });
}

startGame();