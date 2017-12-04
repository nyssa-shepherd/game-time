var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var GamePieces = require('./GamePieces.js');
var Player = require('./Player.js')
var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');
var levelArray = require('./Level.js');

var newBall = new Ball(10, 300, 5, 5, 0, Math.PI * 2, false, 'green');
var thePaddle = new Paddle(100, 500, 50, 10, 100, 'green');
var player = new Player();
var brick = new Brick();
var brickArray = [];

levelArray[1].forEach(function(brick) { 
  brickArray.push(new Brick(brick.x, brick.y, brick.height, brick.width, brick.color))
})

window.addEventListener('keyup', function(event, Paddle) {
  if (event.keyCode == 37) {
    thePaddle.movePaddleLeft();
  } else if (event.keyCode == 39) {
    thePaddle.movePaddleRight();
  }
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode == 37) {
    thePaddle.slidePaddleLeft();
  } else if (event.keyCode == 39) {
    thePaddle.slidePaddleRight();
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
  player.drawIndicatorsText(ctx);

  if (newBall.y + newBall.radius > 600) {
    player.playerDie();

    if(player.livesRemaining > 0) {
      newBall.reset();
    }
  }

  let collidingBrick = brickArray.find( (brick) => {
    return brick.collisionDetection(newBall);
  })

  if (collidingBrick) {
    newBall.dy = -newBall.dy;
    let brickIndex = brickArray.indexOf(collidingBrick);
    
    brickArray.splice(brickIndex, 1);
    player.score += 50;
  }
}

requestAnimationFrame(gameLoop)