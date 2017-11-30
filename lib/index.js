var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var newBall = new Ball(10, 300, 5, 5, 0, Math.PI * 2, false, 'green');
var thePaddle = new Paddle(100, 500, 50, 100, 10, 'green');


window.addEventListener('keyup', function(event, Paddle) {
  if (event.keyCode == 37) {
    console.log(thePaddle.x);
    thePaddle.movePaddleLeft();
  } else if (event.keyCode == 39) {
    console.log(thePaddle.x);
    thePaddle.movePaddleRight();
  }
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode == 37) {
    thePaddle.slidePaddleLeft();
    console.log(thePaddle.x)
  } else if (event.keyCode == 39) {
    thePaddle.slidePaddleRight();
    console.log(thePaddle.x)
  }
});


function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  newBall.drawBall(ctx).move();
  thePaddle.draw(ctx);
}

requestAnimationFrame(gameLoop);


