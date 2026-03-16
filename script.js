const cancelBtn = document.querySelector(
  ".user-name-form-button-container .cancel-btn",
);
const editBtns = document.querySelectorAll(".edit-player-name-button");
const confirmBtn = document.querySelector(
  ".user-name-form-button-container .confirm-btn",
);
const playerNames = document.querySelectorAll(".player-name");
const startBtn = document.querySelector(".game-start");
const gameFields = document.querySelectorAll(".game-field div");
const playerNameTurn = document.querySelector("strong");
const gameResult = document.querySelector(".game-result");

let playerInputCount = 0;
let playerTurn = 0;

function hideOverlay() {
  const overlay = document.querySelector(".module-overlay");
  const input = document.getElementById("player-name-input");
  overlay.classList.add("hidden");
  playerInputCount = 0;
  input.value = "";
}

cancelBtn.addEventListener("click", hideOverlay);

function showOverlay1() {
  const overlay = document.querySelector(".module-overlay");
  overlay.classList.remove("hidden");
}
function showOverlay2() {
  const overlay = document.querySelector(".module-overlay");
  overlay.classList.remove("hidden");
  playerInputCount = 1;
}

editBtns[0].addEventListener("click", showOverlay1);
editBtns[1].addEventListener("click", showOverlay2);

function changePlayerName() {
  const input = document.getElementById("player-name-input");
  if (playerInputCount === 1) {
    playerNames[1].textContent = input.value;
  } else {
    playerNames[0].textContent = input.value;
  }
  hideOverlay();
}

confirmBtn.addEventListener("click", changePlayerName);

function selectField(e) {
  e.target.classList.add("used");
  if (PlayerNumber == 1) {
    e.target.textContent = "X";
  } else {
    e.target.textContent = "O";
  }
}

function gameStart(e) {
  playerNameTurn.textContent = playerNames[0].textContent;
  playerTurn = 0;
  for (const gameField of gameFields) {
    gameField.textContent = "";
    gameField.classList.remove("used");
  }
  gameResult.classList.add("hidden");
  //   gameResult.firstChild.textContent("");
  gameResult.parentElement.classList.remove("hidden");
}

startBtn.addEventListener("click", gameStart);

function switchPlayer() {
  if (playerTurn == 0) {
    playerNameTurn.textContent = playerNames[1].textContent;
    playerTurn = 1;
  } else {
    playerNameTurn.textContent = playerNames[0].textContent;
    playerTurn = 0;
  }
}

function playerDraw() {
  gameResult.classList.remove("hidden");
  gameResult.firstElementChild.textContent = "It's a draw!";
}

function playerWon() {
  gameResult.classList.remove("hidden");
  if (playerTurn === 1) {
    gameResult.firstElementChild.textContent =
      "You won, " + playerNames[0].textContent + "!";
  } else {
    gameResult.firstElementChild.textContent =
      "You won, " + playerNames[1].textContent + "!";
  }
}

function checkforWinner() {
  let emptyFieldsCounter = 0;
  for (const gameField of gameFields) {
    if (gameField.textContent == "") {
      emptyFieldsCounter++;
    }
  }
  //   horizontal wins
  if (
    (gameFields[0].textContent === gameFields[1].textContent &&
      gameFields[0].textContent === gameFields[2].textContent &&
      gameFields[0].textContent !== "") ||
    (gameFields[3].textContent === gameFields[4].textContent &&
      gameFields[3].textContent === gameFields[5].textContent &&
      gameFields[3].textContent !== "") ||
    (gameFields[6].textContent === gameFields[7].textContent &&
      gameFields[6].textContent === gameFields[8].textContent &&
      gameFields[6].textContent !== "")
  ) {
    playerWon();
  } else if (
    (gameFields[0].textContent === gameFields[3].textContent &&
      gameFields[0].textContent === gameFields[6].textContent &&
      gameFields[0].textContent !== "") ||
    (gameFields[1].textContent === gameFields[4].textContent &&
      gameFields[1].textContent === gameFields[7].textContent &&
      gameFields[1].textContent !== "") ||
    (gameFields[2].textContent === gameFields[5].textContent &&
      gameFields[2].textContent === gameFields[8].textContent &&
      gameFields[2].textContent !== "")
  ) {
    playerWon();
  } else if (
    (gameFields[0].textContent === gameFields[4].textContent &&
      gameFields[0].textContent === gameFields[8].textContent &&
      gameFields[0].textContent !== "") ||
    (gameFields[2].textContent === gameFields[4].textContent &&
      gameFields[2].textContent === gameFields[6].textContent &&
      gameFields[2].textContent !== "")
  ) {
    playerWon();
  } else if (emptyFieldsCounter === 0) {
    playerDraw();
  }
}

function makeMove(e) {
  e.target.classList.add("used");
  if (playerTurn == 0) {
    e.target.textContent = "X";
  } else {
    e.target.textContent = "O";
  }

  switchPlayer();
  checkforWinner();
}

for (const gameField of gameFields) {
  gameField.addEventListener("click", makeMove);
}
