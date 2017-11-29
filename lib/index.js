var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var newBall = new Ball(10, 300, 5, 5, 0, Math.PI * 2, false, 'green');
var thePaddle = new Paddle();

function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  newBall.drawBall(ctx).move();
  thePaddle.draw(ctx);
}

requestAnimationFrame(gameLoop);


