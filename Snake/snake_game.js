const gameContainer = document.getElementById("gameContainer");
let snake, food, direction, score, gameInterval;

function initGame() {
    snake = [{ x: 1, y: 20 }];
    generateFood();
    direction = "right";
    score = 0;
    document.getElementById("score").textContent = score;
    gameContainer.innerHTML = "";
    createGrid();
    drawSnake();
    drawFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, 100);
}

function createGrid() {
    for (let i = 0; i < 1600; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.id = `pixel${i}`;
        gameContainer.appendChild(pixel);
    }
}

function drawSnake() {
    document.querySelectorAll(".snakeBodyPixel").forEach(pixel => pixel.classList.remove("snakeBodyPixel"));
    snake.forEach(part => {
        const index = part.y * 40 + part.x;
        document.getElementById(`pixel${index}`).classList.add("snakeBodyPixel");
    });
}

function generateFood() {
    let newFood;
    do {
        newFood = { x: Math.floor(Math.random() * 40), y: Math.floor(Math.random() * 40) };
    } while (snake.some(part => part.x === newFood.x && part.y === newFood.y));
    food = newFood;
}

function drawFood() {
    document.querySelectorAll(".food").forEach(pixel => pixel.classList.remove("food"));
    const index = food.y * 40 + food.x;
    document.getElementById(`pixel${index}`).classList.add("food");
}

function moveSnake() {
    let head = { ...snake[0] };
    if (direction === "right") head.x += 1;
    if (direction === "left") head.x -= 1;
    if (direction === "up") head.y -= 1;
    if (direction === "down") head.y += 1;

    if (head.x < 0 || head.x >= 40 || head.y < 0 || head.y >= 40) {
        alert("Game Over!");
        initGame();
        return;
    }

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
    drawSnake();
    drawFood();
}

function changeDirection(event) {
    if (event.key === "ArrowRight" && direction !== "left") direction = "right";
    if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (event.key === "ArrowUp" && direction !== "down") direction = "up";
    if (event.key === "ArrowDown" && direction !== "up") direction = "down";
}

document.addEventListener("keydown", changeDirection);
initGame();