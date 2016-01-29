/*jslint browser:true */
var canvas = document.getElementById("mainCanvas");
var cookie = document.cookie;
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 40;
var context = canvas.getContext("2d");

var keys = [];
var touches = {
        x1: undefined,
        y1: undefined,
        x2: undefined,
        y2: undefined
    };

var width = canvas.width;
var speed = width * 0.005;
var height = canvas.height;
var characterheight = width * 0.03;
var characterwidth = width * 0.03;
var player = {
        x: 40,
        y: 40,
        width: characterwidth,
        height: characterheight
    };
var npc = {
        x: Math.random() * (width - characterwidth),
        y: Math.random() * (height - characterheight),
        width: characterwidth,
        height: characterheight
    };
var npc2 = {
        x: Math.random() * (width - characterwidth),
        y: Math.random() * (height - characterheight),
        width: characterwidth,
        height: characterheight
    };
var score = 0;
var uncertainty = 0.1;
var fontsize = 32;
var highscore = 0;

window.addEventListener("keydown", function (e) {
    "use strict";
    keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function (e) {
    "use strict";
    delete keys[e.keyCode];
}, false);

window.addEventListener("touchstart", function (e) {
    "use strict";
    if (!(e.changedTouches === undefined)) {
        touches.x1 = parseInt(e.changedTouches[0].clientX, 10);
        touches.y1 = parseInt(e.changedTouches[0].clientY, 10);
    }
}, false);

window.addEventListener("touchend", function (e) {
    "use strict";
    touches.x2 = parseInt(e.changedTouches[0].clientX, 10);
    touches.y2 = parseInt(e.changedTouches[0].clientY, 10);
}, false);

document.addEventListener("touchmove", function (e) {
    "use strict";
    e.preventDefault();
}, false);

function touchMovement() {
    "use strict";
    if (!(touches.x1 === undefined) && !(touches.y1 === undefined) && !(touches.x2 === undefined) && !(touches.y2 === undefined)) {
        if ((touches.x1 < touches.x2) && (Math.abs(touches.x1 - touches.x2) / canvas.width > uncertainty)) {
            player.x += speed;
        }
        if ((touches.x1 > touches.x2) && (Math.abs(touches.x1 - touches.x2) / canvas.width > uncertainty)) {
            player.x -= speed;
        }
        if ((touches.y1 < touches.y2) && (Math.abs(touches.y1 - touches.y2) / canvas.height > uncertainty)) {
            player.y += speed;
        }
        if ((touches.y1 > touches.y2) && (Math.abs(touches.y1 - touches.y2) / canvas.height > uncertainty)) {
            player.y -= speed;
        }
    }
}

function quadrantRun(player, npc) {
  //normal running outside of the cross
    "use strict";
    if (player.x >= npc.x) {
        npc.x = npc.x - (speed * 2 / 3);
    }
    if (player.x < npc.x) {
        npc.x = npc.x + (speed * 2 / 3);
    }
    if (player.y >= npc.y) {
        npc.y = npc.y - (speed * 2 / 3);
    }
    if (player.y < npc.y) {
        npc.y = npc.y + (speed * 2 / 3);
    }
}

function quadrantChase(player, npc) {
  //normal running outside of the cross
    "use strict";
    if (player.x >= npc.x) {
        npc.x = npc.x + (speed * 2 / 3);
    }
    if (player.x < npc.x) {
        npc.x = npc.x - (speed * 2 / 3);
    }
    if (player.y >= npc.y) {
        npc.y = npc.y + (speed * 2 / 3);
    }
    if (player.y < npc.y) {
        npc.y = npc.y - (speed * 2 / 3);
    }
}

function makeScore(score) {
    "use strict";
    context.fillStyle = "white";
    context.font = "bold " + (0.05 * width) + "px CharterBT";
    context.fillText(score, canvas.width / 2, 0.1 * height + 2);
}

function makeHighScore() {
    "use strict";
    context.fillStyle = "white";
    context.font = "bold " + (0.05 * width) + "px CharterBT";
    context.fillText(highscore, canvas.width * 2 / 3, 0.1 * height + 2);
}

function makeCharacter(character, color) {
    "use strict";
    context.fillStyle = color;
    context.fillRect(character.x, character.y, character.width, character.height);
}

function clearCanvas() {
    "use strict";
    if (player.x >= npc.x) {
        npc.x = npc.x - (speed * 2 / 3);
    }
    context.clearRect(0, 0, width, height);
}

function bounds(character, distance) {
    "use strict";
    if (character.x <= distance) {
        character.x = distance;
    }
    if (character.y <= distance) {
        character.y = distance;
    }
    if (character.x >= (width - character.width - distance)) {
        character.x = width - character.width - distance;
    }
    if (character.y >= (height - character.height - distance)) {
        character.y = height - character.height - distance;
    }
}

function keyMovement() {
    "use strict";
    if (keys[38]) {
        player.y -= speed;
    }
    if (keys[40]) {
        player.y += speed;
    }
    if (keys[37]) {
        player.x -= speed;
    }
    if (keys[39]) {
        player.x += speed;
    }
}

function processCollision() {
    "use strict";
    score = score + 1;
    npc.x = Math.random() * (width - 20);
    npc.y = Math.random() * (height - 20);
}

function processHurt() {
    "use strict";
    score = score - 1;
    npc2.x = Math.random() * (width - 20);
    npc2.y = Math.random() * (height - 20);
}

function collisionRect(first, second) {
    "use strict";
    return !(first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y);
}

function updateHScore() {
    "use strict";
    if (score > highscore) {
        highscore = score;
    }
}

function render() {
    "use strict";
    clearCanvas();
    makeCharacter(player, "rgb(21, 206, 246)");
    makeCharacter(npc, "rgb(20, 255, 0)");
    makeCharacter(npc2, "rgb(255, 0, 0)");
    makeScore(score);
    updateHScore();
    makeHighScore();
}


function update() {
    "use strict";
    keyMovement();
    touchMovement();
    bounds(player, 0);
    bounds(npc, width * 0.15);
    bounds(npc2, width * 0.1);
    if (collisionRect(player, npc)) {
        processCollision();
    }
    if (collisionRect(player, npc2)) {
        processHurt();
    }
    quadrantRun(player, npc);
    quadrantChase(player, npc2);
}

function game() {
    "use strict";
    update();
    render();
}

setInterval(function () {
    "use strict";
    game();
}, 1000 / 60);
