// script.js

const square = document.getElementById('square');
const scoreDisplay = document.getElementById('score');
let score = 0;

function moveSquare() {
    const gameArea = document.getElementById('gameArea');
    const maxX = gameArea.clientWidth - square.clientWidth;
    const maxY = gameArea.clientHeight - square.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    square.style.left = `${randomX}px`;
    square.style.top = `${randomY}px`;
}

function updateScore() {
    score += 1;
    scoreDisplay.textContent = score;
}

square.addEventListener('click', () => {
    updateScore();
    moveSquare();
});

// Inicializa el movimiento del cuadrado
moveSquare();
