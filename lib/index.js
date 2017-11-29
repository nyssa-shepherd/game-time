var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var randomDx = Math.random() * 10;
var randomDy = Math.random() * 10;

var newBall = new Ball(10, 300, randomDx, randomDy, 0, Math.PI * 2, false);
var thePaddle = new Paddle();

function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  newBall.draw(ctx).move();
  thePaddle.draw(ctx);
}

requestAnimationFrame(gameLoop);


