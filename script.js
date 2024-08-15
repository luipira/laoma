// script.js

const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let direction = { x: 20, y: 0 };
let score = 0;

function createSnakePart(part) {
    const snakePart = document.createElement('div');
    snakePart.style.left = `${part.x}px`;
    snakePart.style.top = `${part.y}px`;
    snakePart.classList.add('snake');
    gameArea.appendChild(snakePart);
}

function createFood() {
    food.x = Math.floor(Math.random() * 25) * 20;
    food.y = Math.floor(Math.random() * 25) * 20;
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (newHead.x < 0 || newHead.x >= 500 || newHead.y < 0 || newHead.y >= 500 || snake.some(part => part.x === newHead.x && part.y === newHead.y)) {
        alert('¡Juego terminado!');
        document.location.reload();
    }

    snake.unshift(newHead);
    
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

function draw() {
    gameArea.innerHTML = '';
    snake.forEach(createSnakePart);
    createFood();
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -20 };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 20 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -20, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 20, y: 0 };
            }
            break;
    }
}

function gameLoop() {
    moveSnake();
    draw();
}

document.addEventListener('keydown', changeDirection);

setInterval(gameLoop, 100);

