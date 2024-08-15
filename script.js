// script.js

const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');

let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let direction = { x: 4, y: 0 };
let score = 0;

function createSnakePart(part) {
    const snakePart = document.createElement('div');
    snakePart.style.left = `${part.x}vw`;
    snakePart.style.top = `${part.y}vw`;
    snakePart.classList.add('snake');
    gameArea.appendChild(snakePart);
}

function createFood() {
    food.x = Math.floor(Math.random() * 22) * 4;
    food.y = Math.floor(Math.random() * 22) * 4;
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x}vw`;
    foodElement.style.top = `${food.y}vw`;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (newHead.x < 0 || newHead.x >= 90 || newHead.y < 0 || newHead.y >= 90 || snake.some(part => part.x === newHead.x && part.y === newHead.y)) {
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

function changeDirection(newDirection) {
    if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
        direction = newDirection;
    }
}

function handleKey(event) {
    switch (event.key) {
        case 'ArrowUp':
            changeDirection({ x: 0, y: -4 });
            break;
        case 'ArrowDown':
            changeDirection({ x: 0, y: 4 });
            break;
        case 'ArrowLeft':
            changeDirection({ x: -4, y: 0 });
            break;
        case 'ArrowRight':
            changeDirection({ x: 4, y: 0 });
            break;
    }
}

document.addEventListener('keydown', handleKey);

document.getElementById('up').addEventListener('click', () => changeDirection({ x: 0, y: -4 }));
document.getElementById('down').addEventListener('click', () => changeDirection({ x: 0, y: 4 }));
document.getElementById('left').addEventListener('click', () => changeDirection({ x: -4, y: 0 }));
document.getElementById('right').addEventListener('click', () => changeDirection({ x: 4, y: 0 }));

setInterval(moveSnake, 100);
draw();


