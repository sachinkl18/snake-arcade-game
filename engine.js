// =========================
// ENGINE MODULE
// =========================

function update(){

direction = nextDirection;

const head = {

x: snake[0].x,

y: snake[0].y

};

switch(direction){

case "UP":
head.y--;
break;

case "DOWN":
head.y++;
break;

case "LEFT":
head.x--;
break;

case "RIGHT":
head.x++;
break;

}

if(checkWall(head) || checkSnake(head)){

gameOver();

return;

}

snake.unshift(head);

if(head.x===food.x && head.y===food.y){

score++;

if(score>highScore){

highScore=score;

localStorage.setItem("highscore",highScore);

}

if(score%5===0){

level++;

speed+=0.8;

}

spawnFood();

updateHUD();

}else{

snake.pop();

}

}

function checkWall(head){

return(

head.x<0 ||

head.y<0 ||

head.x>=COLS ||

head.y>=ROWS

);

}

function checkSnake(head){

return snake.some(

part=>part.x===head.x && part.y===head.y

);

}

function gameOver(){

gameRunning=false;

alert(

"Game Over\n\nScore : "+score+

"\nLevel : "+level

);

document.getElementById("menuScreen").classList.remove("hidden");

document.getElementById("gameScreen").classList.add("hidden");

}
