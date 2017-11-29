var GamePieces = require('./GamePieces.js');
var Ball = require('./Ball.js');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');


var newBall = new Ball(10, 300, 10, 10, 0, Math.PI * 2, false);

function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newBall.draw(ctx).move(2, 2);
}

requestAnimationFrame(gameLoop);
