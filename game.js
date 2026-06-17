// =====================================
// Snake Arcade Pro Ultimate
// Game Engine v1.0
// =====================================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Grid
const GRID_SIZE = 20;
const COLS = 30;
const ROWS = 30;

// Canvas Size
canvas.width = GRID_SIZE * COLS;
canvas.height = GRID_SIZE * ROWS;

// Game State
let gameRunning = false;
let gamePaused = false;

// Snake
let snake = [];
let direction = "RIGHT";
let nextDirection = "RIGHT";

// Food
let food = {x:10,y:10};

// Coins
let coins = [];

// Obstacles
let obstacles = [];

// Particles
let particles = [];

// Score
let score = 0;
let level = 1;
let speed = 8;

// High Score
let highScore =
parseInt(localStorage.getItem("highscore")) || 0;

document.getElementById("highScore").textContent =
highScore;

// =====================================
// Initialize
// =====================================

function initGame(){

snake=[
{x:5,y:10},
{x:4,y:10},
{x:3,y:10}
];

direction="RIGHT";
nextDirection="RIGHT";

score=0;
level=1;
speed=8;

spawnFood();

updateHUD();

}

initGame();

// =====================================
// HUD
// =====================================

function updateHUD(){

document.getElementById("score").textContent=score;

document.getElementById("level").textContent=level;

document.getElementById("highScore").textContent=highScore;

}

// =====================================
// Food
// =====================================

function spawnFood(){

food={

x:Math.floor(Math.random()*COLS),

y:Math.floor(Math.random()*ROWS)

};

}

// =====================================
// Draw Grid
// =====================================

function drawGrid(){

ctx.strokeStyle="#111";

for(let x=0;x<=COLS;x++){

ctx.beginPath();

ctx.moveTo(x*GRID_SIZE,0);

ctx.lineTo(x*GRID_SIZE,canvas.height);

ctx.stroke();

}

for(let y=0;y<=ROWS;y++){

ctx.beginPath();

ctx.moveTo(0,y*GRID_SIZE);

ctx.lineTo(canvas.width,y*GRID_SIZE);

ctx.stroke();

}

}

// =====================================
// Draw Snake
// =====================================

function drawSnake(){

snake.forEach((part,index)=>{

ctx.fillStyle=index===0?"#00ffff":"#22c55e";

ctx.fillRect(

part.x*GRID_SIZE,

part.y*GRID_SIZE,

GRID_SIZE-2,

GRID_SIZE-2

);

});

}

// =====================================
// Draw Food
// =====================================

function drawFood(){

ctx.fillStyle="#ff1744";

ctx.beginPath();

ctx.arc(

food.x*GRID_SIZE+10,

food.y*GRID_SIZE+10,

8,

0,

Math.PI*2

);

ctx.fill();

}

// =====================================
// Render
// =====================================

function render(){

ctx.clearRect(0,0,canvas.width,canvas.height);

drawGrid();

drawFood();

drawSnake();

}

// =====================================
// Game Loop
// =====================================

let lastTime=0;

function gameLoop(timestamp){

if(!gameRunning)return;

if(gamePaused){

requestAnimationFrame(gameLoop);

return;

}

if(timestamp-lastTime>1000/speed){

update();

lastTime=timestamp;

}

render();

requestAnimationFrame(gameLoop);

}

// =====================================
// Buttons
// =====================================

document.getElementById("playBtn").onclick=()=>{

document.getElementById("menuScreen").classList.add("hidden");

document.getElementById("gameScreen").classList.remove("hidden");

gameRunning=true;

requestAnimationFrame(gameLoop);

};

document.getElementById("pauseBtn").onclick=()=>{

gamePaused=true;

};

document.getElementById("resumeBtn").onclick=()=>{

gamePaused=false;

};

document.getElementById("restartBtn").onclick=()=>{

initGame();

};

// =====================================
// Temporary Update
// =====================================

function update(){

// Step 3.2

}
