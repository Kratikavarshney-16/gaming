const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F3FF33", 
    "#FF33A1", "#33FFF6", "#A133FF", "#FF337B"
]; // Array of colors for tiles
const numbers = [1, 2, 3, 4, 5, 6, 7, 8]; // Unique numbers for each color
let board = [];
let firstTile = null;
let secondTile = null;
let matchesFound = 0;

function initializeGame() {
    // Create pairs of numbers and colors
    const pairedBoard = [];
    numbers.forEach((num, index) => {
        pairedBoard.push({ number: num, color: colors[index] });
        pairedBoard.push({ number: num, color: colors[index] });
    });

    // Shuffle the pairedBoard array
    board = shuffle(pairedBoard);

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    board.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        tileDiv.setAttribute('data-index', index);
        tileDiv.textContent = ''; // Initially empty
        tileDiv.style.backgroundColor = "#4CAF50"; // Default color
        tileDiv.addEventListener('click', flipTile);
        gameBoard.appendChild(tileDiv);
    });

    document.getElementById('message').textContent = '';
    document.getElementById('restartButton').style.display = 'none';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipTile() {
    if (firstTile && secondTile) return; // Prevent flipping more than two tiles

    const tile = this;
    const index = tile.getAttribute('data-index');
    tile.style.backgroundColor = board[index].color;
    tile.textContent = board[index].number; // Show the number
    tile.classList.add('flipped');

    if (!firstTile) {
        firstTile = tile;
    } else {
        secondTile = tile;

        if (firstTile.textContent === secondTile.textContent) {
            matchesFound++;
            firstTile.classList.add('matched');
            secondTile.classList.add('matched');
            document.getElementById('message').textContent = 'Match found!';
            resetTurn();
        } else {
            document.getElementById('message').textContent = 'Try again!';
            setTimeout(() => {
                firstTile.style.backgroundColor = "#4CAF50"; // Reset color
                firstTile.textContent = ''; // Reset text
                secondTile.style.backgroundColor = "#4CAF50"; // Reset color
                secondTile.textContent = ''; // Reset text
                resetTurn();
            }, 1000);
        }

        if (matchesFound === numbers.length) {
            document.getElementById('message').textContent = 'You win!';
            document.getElementById('restartButton').style.display = 'block';
        }
    }
}

function resetTurn() {
    firstTile = null;
    secondTile = null;
}

document.getElementById('restartButton').addEventListener('click', initializeGame);

initializeGame();
