var canvas = document.getElementById("mainCanvas");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 40;
var context = canvas.getContext("2d");

var keys = [];
var touches = {x1: undefined, y1: undefined, x2: undefined, y2: undefined}

var width = canvas.width, speed = width * .005, height = canvas.height;
var characterheight = width * .03, characterwidth = width * .03;
var player = {x: 40, y: 40, width: characterwidth, height: characterheight};
var npc = {x: Math.random() * (width - characterwidth), y: Math.random() * (height - characterheight), width: characterwidth, height: characterheight};
var npc2 = {x: Math.random() * (width - characterwidth), y: Math.random() * (height - characterheight), width: characterwidth, height: characterheight};
var score = 0;
var uncertainty = 0.1;
var fontsize = 32;


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

function render(){
  clearCanvas();

  makeCharacter(player, "rgb(16, 39, 190)")
  makeCharacter(npc, "rgb(20, 255, 0)")
  makeCharacter(npc2, "rgb(255, 0, 0)")
  makeScore(score)
}


function update(){
  keyMovement();
  touchMovement();
  bounds(player, 0);
  bounds(npc, width * .15);
  bounds(npc2, width * .1);
  if(collisionRect(player, npc)) processCollision();
  if(collisionRect(player, npc2)) processHurt();
  quadrantRun(player, npc, 80);
  quadrantChase(player, npc2, 80);
}

function touchMovement(){
  if (!(touches.x1 == undefined) && !(touches.y1 == undefined) && !(touches.x2 == undefined) && !(touches.y2 == undefined))
  //left
    if ((touches.x1 < touches.x2) && (Math.abs(touches.x1 - touches.x2)/canvas.width > uncertainty)) player.x+=speed;
    if ((touches.x1 > touches.x2) && (Math.abs(touches.x1 - touches.x2)/canvas.width > uncertainty)) player.x-=speed;
    if ((touches.y1 < touches.y2) && (Math.abs(touches.y1 - touches.y2)/canvas.height > uncertainty)) player.y+=speed;
    if ((touches.y1 > touches.y2) && (Math.abs(touches.y1 - touches.y2)/canvas.height > uncertainty)) player.y-=speed;
    if ((Math.abs(touches.y1 - touches.y2)/canvas.height < uncertainty) && (Math.abs(touches.x1 - touches.x2)/canvas.width < 0.25)) ;
    ;
}



function quadrantRun(player, npc, distance){
  //normal running outside of the cross
  if((player.x >= npc.x)) npc.x = npc.x - (speed * 2 / 3);
  if((player.x < npc.x)) npc.x = npc.x + (speed * 2 / 3);
  if((player.y >= npc.y)) npc.y = npc.y - (speed * 2 / 3);
  if((player.y < npc.y)) npc.y = npc.y + (speed * 2 / 3);

}

function quadrantChase(player, npc, distance){
  //normal running outside of the cross
  if((player.x >= npc.x)) npc.x = npc.x + (speed * 2 / 3);
  if((player.x < npc.x)) npc.x = npc.x - (speed * 2 / 3);
  if((player.y >= npc.y)) npc.y = npc.y + (speed * 2 / 3);
  if((player.y < npc.y)) npc.y = npc.y - (speed * 2 / 3);

}

function makeScore(score){
  context.fillStyle = "white";
  context.font = "bold " + (.1 * height) + "px CharterBT"
  context.fillText(score, canvas.width / 2, .1 * height + 2);
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

function processHurt(){
  score--;
  npc2.x = Math.random() * (width - 20);
  npc2.y = Math.random() * (height - 20);
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
