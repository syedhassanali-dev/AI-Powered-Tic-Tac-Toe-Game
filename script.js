const cell = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restartBtn');

//Inotialize Veriables from the game

let player = "X";
let isPauseGame = false;
let isGameStart = false;

// Arrays of win conditions

const inputCells = [
    '', '', '',
    '', '', '',
    '', '', ''
];

// Arrays of win conditions

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Coulumn
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Add click event listeners to each cell

cell.forEach((cell, index) => {
    cell.addEventListener("click", () => tapCell(cell, index))
});

function tapCell(cell, index) {
    // Ensure cell emty and game is not pause
    if (cell.textContent == '' &&
        !isPauseGame
    ) {
        isGameStart = true;
        updateCell(cell, index);

        // Do a random pick if there are no result
        if (!checkWinner()) {
            changePlayer();
            randomPick();
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = player;
    inputCells[index] = player;
    cell.style.color = (player == "X") ? '#1892EA' : '#A737FF';
}

function changePlayer() {
    player = (player == "X") ? "O" : "X";
}

function randomPick() {
    // Pause the game to allow the computer to pick
    isPauseGame = true

    setTimeout(() => {
        let randomIndex
        do {
            // Pick a random index
            randomIndex = Math.floor(Math.random() * inputCells.length)
        } while (
            // Ensure the chosien cell is empty
            inputCells[randomIndex] != ''
        )

        // Update the cell with computer move
        updateCell(cell[randomIndex], randomIndex, player)
        // Check if computer won
        if(!checkWinner()) {
            changePlayer()
            // Switch back to homain player
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'
    }, 700) // Delay the Computer Move by 1 sec
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {

        // Check each winning condition
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player
        ) {
            declareWinner([a, b, c]);
            return true;
        }
    }
    // Check for a draw (if are called are filled)
    if (inputCells.every(cell => cell != "")) {
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Win`;
    isPauseGame = true;

    // Highlight winnig cell
    winningIndices.forEach((index) =>
        cell[index].style.background = "#2A2343"
);

    restartBtn.style.visibility = 'visible';
}

function declareDraw() {
    titleHeader.textContent = "Draw!"
    isPauseGame = true
    restartBtn.style.visibility = "visible"
}

function chosePlayer(selectPlayer) {
    // Ensur the game has not started
    if (!isGameStart) {
        // Override the select player
        player = selectPlayer
        if (player == 'X') {
            // Highlight X Display
            xPlayerDisplay.classList.add(`playerActive`)
            oPlayerDisplay.classList.remove(`playerActive`)
        } else {
            // Highlight O Display 
            oPlayerDisplay.classList.add(`playerActive`)
            xPlayerDisplay.classList.remove(`playerActive`)
        }
    }
}

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cell.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })

    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'Chose'
})