const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = Array.from(document.querySelectorAll(".cell"));
const boardElement = document.querySelector("#board");
const statusMessage = document.querySelector("#status-message");
const turnIndicator = document.querySelector("#turn-indicator");
const scoreX = document.querySelector("#score-x");
const scoreO = document.querySelector("#score-o");
const scoreCardX = document.querySelector("#score-card-x");
const scoreCardO = document.querySelector("#score-card-o");
const newRoundButton = document.querySelector("#new-round");
const resetScoreButton = document.querySelector("#reset-score");

let board = Array(9).fill("");
let currentPlayer = "X";
let roundFinished = false;
let scores = { X: 0, O: 0 };

function findWinningLine() {
  return winningLines.find(([first, second, third]) => {
    return (
      board[first] &&
      board[first] === board[second] &&
      board[first] === board[third]
    );
  });
}

function updateTurnDisplay() {
  const isXTurn = currentPlayer === "X";
  turnIndicator.textContent = currentPlayer;
  turnIndicator.classList.toggle("is-o", !isXTurn);
  scoreCardX.classList.toggle("is-current", isXTurn && !roundFinished);
  scoreCardO.classList.toggle("is-current", !isXTurn && !roundFinished);
}

function renderBoard() {
  delete boardElement.dataset.winningLine;
  cells.forEach((cell, index) => {
    const value = board[index];
    cell.textContent = value;
    cell.disabled = Boolean(value) || roundFinished;
    cell.classList.toggle("is-o", value === "O");
    cell.classList.remove("is-winning");
    cell.setAttribute(
      "aria-label",
      `第 ${index + 1} 格，${value ? `玩家 ${value}` : "空格"}`,
    );
  });
}

function finishRound(message, winningLine = []) {
  roundFinished = true;
  statusMessage.textContent = message;
  turnIndicator.classList.add("is-done");
  renderBoard();
  if (winningLine.length > 0) {
    boardElement.dataset.winningLine = winningLines.indexOf(winningLine);
  }
  winningLine.forEach((index) => cells[index].classList.add("is-winning"));
  updateTurnDisplay();
}

function playCell(index) {
  if (roundFinished || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  const winningLine = findWinningLine();

  if (winningLine) {
    scores[currentPlayer] += 1;
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    renderBoard();
    finishRound(`玩家 ${currentPlayer} 獲勝！`, winningLine);
    return;
  }

  if (board.every(Boolean)) {
    renderBoard();
    finishRound("平手！再來一局？");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusMessage.textContent = `玩家 ${currentPlayer} 的回合`;
  renderBoard();
  updateTurnDisplay();
}

function startNewRound() {
  board = Array(9).fill("");
  currentPlayer = "X";
  roundFinished = false;
  statusMessage.textContent = "玩家 X 的回合";
  turnIndicator.classList.remove("is-done");
  renderBoard();
  updateTurnDisplay();
  cells[0].focus();
}

function resetScores() {
  scores = { X: 0, O: 0 };
  scoreX.textContent = "0";
  scoreO.textContent = "0";
  startNewRound();
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => playCell(Number(cell.dataset.cell)));
});

newRoundButton.addEventListener("click", startNewRound);
resetScoreButton.addEventListener("click", resetScores);

renderBoard();
updateTurnDisplay();
