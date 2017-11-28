var GamePieces = require('./GamePieces.js');
var Ball = require('./Ball.js');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');



var newBall = new Ball(40, 300, 10, 0, Math.PI * 2, false, 'blue');

function gameLoop() {
    requestAnimationFrame(gameLoop);
    newBall.draw(ctx);
}

requestAnimationFrame(gameLoop);