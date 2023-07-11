let tictac = document.querySelectorAll(".tictac");
let turn = document.querySelector(".turn");
let btn = document.querySelector(".btn");

let winCases = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

function initialization() {
  tictac.forEach((tictac) => tictac.addEventListener("click", tictacClick));
  btn.addEventListener("click", restartGame);
  turn.textContent = `${currentPlayer}'s turn`;
  running = true;
}

initialization();

function tictacClick() {
  let tictac = this.getAttribute("tictac");

  if (options[tictac] != "" || !running) {
    return;
  }
  updatetictac(this, tictac);
  checkWinner();
}

function updatetictac(tictac, index) {
  options[index] = currentPlayer;
  tictac.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turn.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  for (let i = 0; i < winCases.length; i++) {
    const [a, b, c] = winCases[i];
    if (options[a] !== "" && options[a] === options[b] && options[a] === options[c]) {
      // Game over, we have a winner
      running = false;
      turn.textContent = `${currentPlayer} wins!`;
      return;
    }
  }

  // If all options are filled, and no one has won, it's a tie
  if (!options.includes("")) {
    running = false;
    turn.textContent = "It's a tie!";
    return;
  }
  // No winner yet, continue playing
  changePlayer();
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  turn.textContent = `${currentPlayer}'s turn`;
  tictac.forEach((tictac) => {
    tictac.textContent = "";
  });
}