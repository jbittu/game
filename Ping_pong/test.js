const startScreen = document.getElementById("start-screen");
const gameArea = document.getElementById("game-area");
const gameOverScreen = document.getElementById("game-over-screen");
const playerPaddle = document.getElementById("player-paddle");
const computerPaddle = document.getElementById("computer-paddle");
const ball = document.getElementById("ball");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const winnerText = document.getElementById("winner-text");

let playerName = "";
let playerPaddleY = 160;
let computerPaddleY = 160;
let ballX = 390;
let ballY = 190;
let ballSpeedX = 3;
let ballSpeedY = 3;
let playerScore = 0;
let computerScore = 0;

document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("player-name").value || "Player";
  playerScoreDisplay.textContent = `${playerName}: 0`;
  startScreen.style.display = "none";
  gameArea.style.display = "block";
  update();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = `${playerName}: 0`;
  computerScoreDisplay.textContent = `Computer: 0`;
  gameOverScreen.style.display = "none";
  gameArea.style.display = "block";
  ballX = 390;
  ballY = 190;
  ballSpeedX = 3;
  ballSpeedY = 3;
  update();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && playerPaddleY > 0) {
    playerPaddleY -= 20;
  }
  if (event.key === "ArrowDown" && playerPaddleY < gameArea.offsetHeight - playerPaddle.offsetHeight) {
    playerPaddleY += 20;
  }
  playerPaddle.style.top = `${playerPaddleY}px`;
});

function update() {
  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY <= 0 || ballY >= gameArea.offsetHeight - ball.offsetHeight) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (
    ballX <= playerPaddle.offsetWidth &&
    ballY + ball.offsetHeight >= playerPaddleY &&
    ballY <= playerPaddleY + playerPaddle.offsetHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX + ball.offsetWidth >= gameArea.offsetWidth - computerPaddle.offsetWidth &&
    ballY + ball.offsetHeight >= computerPaddleY &&
    ballY <= computerPaddleY + computerPaddle.offsetHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Move computer paddle
  computerPaddleY += (ballY - computerPaddleY - computerPaddle.offsetHeight / 2) * 0.05;
  computerPaddle.style.top = `${computerPaddleY}px`;

  // Check scoring
  if (ballX <= 0) {
    computerScore++;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
    resetBall();
  }
  if (ballX >= gameArea.offsetWidth - ball.offsetWidth) {
    playerScore++;
    playerScoreDisplay.textContent = `${playerName}: ${playerScore}`;
    resetBall();
  }

  // Check game over
  if (playerScore === 11 || computerScore === 11) {
    endGame(playerScore === 11 ? playerName : "Computer");
    return;
  }

  // Update ball position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  requestAnimationFrame(update);
}

function resetBall() {
  ballX = 390;
  ballY = 190;
  ballSpeedX = -ballSpeedX;
}

function endGame(winner) {
  gameArea.style.display = "none";
  gameOverScreen.style.display = "block";
  winnerText.textContent = `${winner} wins!`;
}
