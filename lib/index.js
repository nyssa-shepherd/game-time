var GamePieces = require('./GamePieces.js');
var Player = require('./Player.js')
var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');


var newBall = new Ball(10, 300, 5, 5, 0, Math.PI * 2, false, 'green');
var thePaddle = new Paddle(100, 500, 50, 100, 10, 'green');
var player = new Player();

var brick1 = new Brick(5, 50, 90, 30, 'pink');
var brick2 = new Brick(105, 50, 90, 30, 'pink');
var brick3 = new Brick(205, 50, 90, 30, 'pink');
var brick4 = new Brick(305, 50, 90, 30, 'pink');
var brick5 = new Brick(405, 50, 90, 30, 'pink');
var brick6 = new Brick(505, 50, 90, 30, 'pink');
var brick7 = new Brick(5, 100, 90, 30, 'pink');
var brick8 = new Brick(105, 100, 90, 30, 'pink');
var brick9 = new Brick(205, 100, 90, 30, 'pink');
var brick10 = new Brick(305, 100, 90, 30, 'pink');
var brick11 = new Brick(405, 100, 90, 30, 'pink');
var brick12 = new Brick(505, 100, 90, 30, 'pink');

var brickArray = [brick1, brick2, brick3, brick4, brick5, brick6, brick7, brick8, brick9, brick10, brick11, brick12];

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
  brickArray.forEach((brick) => 
    brick.draw(ctx)
  );
  newBall.paddleTouch(thePaddle);
  player.drawLivesLeft(ctx);

  if (newBall.y + newBall.radius > 600) {
    player.playerDie();
}
}

requestAnimationFrame(gameLoop)