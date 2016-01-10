var canvas = document.getElementById("mainCanvas");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 40;
var context = canvas.getContext("2d");

var keys = [];
var touches = {x1: undefined, y1: undefined, x2: undefined, y2: undefined}


var width = canvas.width, speed = 4, height = canvas.height;

var player = {x: 40, y: 40, width: 20, height: 20};

var npc = {x: Math.random() * (width - 20), y: Math.random() * (height - 20), width: 20, height: 20};

var score = 0;

window.addEventListener("keydown",  function(e){
         keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup",  function(e){
         delete keys[e.keyCode];
}, false);

/*
up - 38
down - 40
left - 37
right - 39
*/
window.addEventListener("touchstart", function(e){
  if (!(e.changedTouches == undefined))
  touches.x1 = parseInt(e.changedTouches[0].clientX)
  touches.y1 = parseInt(e.changedTouches[0].clientY);
}, false)

window.addEventListener("touchend", function(e){
  touches.x2 = parseInt(e.changedTouches[0].clientX)
  touches.y2 = parseInt(e.changedTouches[0].clientY);
}, false)

document.addEventListener("touchmove", function(e) {
  e.preventDefault();
}, false)

function game(){
   update();
   render();
}

function update(){
  keyMovement();
  touchMovement();
  bounds(player, 0);
  bounds(npc, 100);
  if(collisionRect(player, npc)) processCollision();
  quadrantRun(player, npc, 80);
}
function
 touchMovement(){

  if (!(touches.x1 == undefined) && !(touches.y1 == undefined) && !(touches.x2 == undefined) && !(touches.y2 == undefined))
  //left
    if ((touches.x1 < touches.x2) && (Math.abs(touches.x1 - touches.x2)/canvas.width > 0.25)) player.x+=speed;
    if ((touches.x1 > touches.x2) && (Math.abs(touches.x1 - touches.x2)/canvas.width > 0.25)) player.x-=speed;
    if ((touches.y1 < touches.y2) && (Math.abs(touches.y1 - touches.y2)/canvas.height > 0.25)) player.y+=speed;
    if ((touches.y1 > touches.y2) && (Math.abs(touches.y1 - touches.y2)/canvas.height > 0.25)) player.y-=speed;
    if ((Math.abs(touches.y1 - touches.y2)/canvas.height < 0.25) && (Math.abs(touches.x1 - touches.x2)/canvas.width < 0.25)) ;
      ;
}

function render(){
  clearCanvas();

  makeCharacter(player, "blue")
  makeCharacter(npc, "green")
  makeScore(score)

}

function quadrantRun(player, npc, distance){
  //normal running outside of the cross
  if((player.x >= npc.x)) npc.x = npc.x - (speed * 2 / 3);
  if((player.x < npc.x)) npc.x = npc.x + (speed * 2 / 3);
  if((player.y >= npc.y)) npc.y = npc.y - (speed * 2 / 3);
  if((player.y < npc.y)) npc.y = npc.y + (speed * 2 / 3);

}

function makeScore(score){
  context.fillStyle = "black";
  context.font = "bold 32px CharterBT"
  context.fillText(score, canvas.width / 2, 30);
}

function makeCharacter(character, color) {
  context.fillStyle = color;
  context.fillRect(character.x, character.y, character.width, character.height);
}

function clearCanvas(){
  context.clearRect(0, 0, width, height)
}

function bounds(character, distance){
  if(character.x <= (0 + distance)) character.x = (0 + distance);
  if(character.y <= (0 + distance)) character.y = (0 + distance);
  if(character.x >= (width - character.width - distance)) character.x = width - character.width - distance;
  if(character.y >= (height - character.height - distance)) character.y = height - character.height - distance;
}

function keyMovement(){
  if(keys[38]) player.y-=speed;
  if(keys[40]) player.y+=speed;
  if(keys[37]) player.x-=speed;
  if(keys[39]) player.x+=speed;
}

function processCollision(){
  score++;
  npc.x = Math.random() * (width - 20);
  npc.y = Math.random() * (height - 20);
}

function collisionRect(first, second){
  return !(first.x > second.x + second.width ||
           first.x + first.width < second.x ||
           first.y > second.y + second.height ||
           first.y + first.height < second.y);
}

setInterval(function(){
           game();
}, 1000/60)﻿
