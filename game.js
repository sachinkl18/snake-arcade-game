const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = spawnFood();
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let gameInterval = null;
let speed = 120;
let isPaused = false;

document.getElementById("highScore").innerText = highScore;

// ---------- GAME LOOP ----------
function gameLoop() {
  if (isPaused) return;

  update();
  draw();
}

// ---------- UPDATE ----------
function update() {
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // WALL COLLISION
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount
  ) {
    return gameOver();
  }

  // SELF COLLISION
  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      return gameOver();
    }
  }

  snake.unshift(head);

  // FOOD EAT
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = spawnFood();

    if (score % 5 === 0 && speed > 60) {
      speed -= 5;
      restartInterval();
    }
  } else {
    snake.pop();
  }
}

// ---------- DRAW ----------
function draw() {
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // FOOD
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // SNAKE
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#22c55e" : "#16a34a";
    ctx.fillRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );
  }
}

// ---------- FOOD ----------
function spawnFood() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

// ---------- CONTROLS ----------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 1) break;
      direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === -1) break;
      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 1) break;
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === -1) break;
      direction = { x: 1, y: 0 };
      break;
  }
});

// ---------- GAME CONTROL ----------
function startGame() {
  if (!gameInterval) {
    gameInterval = setInterval(gameLoop, speed);
  }
  isPaused = false;
}

function pauseGame() {
  isPaused = true;
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  speed = 120;
  food = spawnFood();
  document.getElementById("score").innerText = 0;
  restartInterval();
}

function gameOver() {
  clearInterval(gameInterval);
  gameInterval = null;

  if (score > highScore) {
    localStorage.setItem("snakeHighScore", score);
  }

  alert("Game Over! Score: " + score);
}

// ---------- SPEED CONTROL ----------
function restartInterval() {
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, speed);
}
