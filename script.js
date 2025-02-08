const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWinner()) {
        statusText.innerText = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusText.innerText = "It's a Draw! 😐";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;
}

// Check for a winner
function checkWinner() {
    return winningPatterns.some(pattern => {
        return pattern.every(index => boardState[index] === currentPlayer);
    });
}

// Reset the game
function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.innerText = "Player X's turn";
    
    cells.forEach(cell => {
        cell.innerText = "";
    });
}

// Attach event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
