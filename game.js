let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener(
"touchstart",
e => {

touchStartX =
e.touches[0].clientX;

touchStartY =
e.touches[0].clientY;

});

canvas.addEventListener(
"touchend",
e => {

let touchEndX =
e.changedTouches[0].clientX;

let touchEndY =
e.changedTouches[0].clientY;

let dxSwipe =
touchEndX - touchStartX;

let dySwipe =
touchEndY - touchStartY;

if(Math.abs(dxSwipe) >
Math.abs(dySwipe)) {

if(dxSwipe > 0)
moveRight();
else
moveLeft();

}
else {

if(dySwipe > 0)
moveDown();
else
moveUp();

}

});
const eatSound =
document.getElementById("eatSound");

const gameOverSound =
document.getElementById("gameOverSound");

const levelSound =
document.getElementById("levelSound");
let leaderboard =
JSON.parse(localStorage.getItem("snakeLeaderboard")) || [];
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 15, y: 15 }];
let food = generateFood();

let dx = 0;
let dy = 0;

let score = 0;
let level = 1;

let gameRunning = false;
let paused = false;

let speed = 120;
let gameLoop;

let highScore =
  localStorage.getItem("snakeHighScore") || 0;

document.getElementById("highScore").innerText =
  highScore;

function generateFood() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function let particles = []; function createParticles(x,y){

for(let i=0;i<15;i++){

particles.push({
x:x,
y:y,
vx:(Math.random()-0.5)*4,
vy:(Math.random()-0.5)*4,
life:30
});

}

}
drawGame() {

  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Food
  ctx.fillStyle = "#f43f5e";
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + 10,
    food.y * gridSize + 10,
    8,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Snake
  snake.forEach((segment, index) => {

    ctx.fillStyle =
      index === 0 ? "#22c55e" : "#16a34a";

    ctx.fillRect(
      segment.x * gridSize,
      segment.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  });
}

function updateGame() {

  if (!gameRunning || paused) return;

  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= tileCount ||
    head.y >= tileCount
  ) {
    gameOver();
    return;
  }

  for (let segment of snake) {
    if (
      segment.x === head.x &&
      segment.y === head.y
    ) {
      gameOver(gameOverSound.currentTime = 0;
gameOverSound.play(););
      return;
    }
  }

  snake.unshift(head);

  if (
    head.x === food.x &&
    head.y === food.y
  ) {

    score++;
    eatSound.currentTime = 0;
eatSound.play();

    document.getElementById("score").innerText =
      score;

    food = generateFood();

    if (score % 5 === 0) {

      level++;
      levelSound.currentTime = 0;
levelSound.play();

      document.getElementById("level").innerText =
        level;

      if (speed > 50) {
        speed -= 10;

        clearInterval(gameLoop);

        gameLoop =
          setInterval(gameTick, speed);
      }
    }

  } else {

    snake.pop();
  }

  drawGame();
}

function gameTick() {
  updateGame();
}

function startGame() {

  if (gameRunning) return;

  dx = 1;
  dy = 0;

  gameRunning = true;

  clearInterval(gameLoop);

  gameLoop =
    setInterval(gameTick, speed);
}

function pauseGame() {
  paused = true;
}

function resumeGame() {
  paused = false;
}

function resetGame() {

  clearInterval(gameLoop);

  snake = [{ x: 15, y: 15 }];

  food = generateFood();

  score = 0;
  level = 1;

  speed = 120;

  dx = 0;
  dy = 0;

  paused = false;
  gameRunning = false;

  document.getElementById("score").innerText =
    0;

  document.getElementById("level").innerText =
    1;

  drawGame();
}

function gameOver() {

  clearInterval(gameLoop);

  gameRunning = false;

  if (score > highScore) {

    highScore = score;

    localStorage.setItem(
      "snakeHighScore",
      highScore
    );

    document.getElementById(
      "highScore"
    ).innerText = highScore;
  }

  updateLeaderboard(score);
  alert(
    "Game Over!\nScore: " +
      score +
      "\nLevel: " +
      level
  );
}

document.addEventListener(
  "keydown",
  (e) => {

    switch (e.key) {

      case "ArrowUp":
        if (dy !== 1) {
          dx = 0;
          dy = -1;
        }
        break;

      case "ArrowDown":
        if (dy !== -1) {
          dx = 0;
          dy = 1;
        }
        break;

      case "ArrowLeft":
        if (dx !== 1) {
          dx = -1;
          dy = 0;
        }
        break;

      case "ArrowRight":
        if (dx !== -1) {
          dx = 1;
          dy = 0;
        }
        break;
    }
  }
);

// Mobile Controls

function moveUp() {
  if (dy !== 1) {
    dx = 0;
    dy = -1;
  }
}

function moveDown() {
  if (dy !== -1) {
    dx = 0;
    dy = 1;
  }
}

function moveLeft() {
  if (dx !== 1) {
    dx = -1;
    dy = 0;
  }
}

function moveRight() {
  if (dx !== -1) {
    dx = 1;
    dy = 0;
  }
}

drawGame();
function updateLeaderboard(score) {

    leaderboard.push(score);

    leaderboard.sort((a,b)=>b-a);

    leaderboard = leaderboard.slice(0,10);

    localStorage.setItem(
        "snakeLeaderboard",
        JSON.stringify(leaderboard)
    );

    renderLeaderboard();
}

function renderLeaderboard() {

    const list =
      document.getElementById("leaderboardList");

    if(!list) return;

    list.innerHTML = "";

    leaderboard.forEach((score,index)=>{

        const li =
          document.createElement("li");

        li.textContent =
          `#${index+1} - ${score}`;

        list.appendChild(li);
    });
}
renderLeaderboard();
