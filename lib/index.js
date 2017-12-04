var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var GamePieces = require('./GamePieces.js');
var Player = require('./Player.js')
var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');
// var Level = require('./Level.js');

var newBall = new Ball(10, 300, 0, 0, 0, Math.PI * 2, false, 'green');
var thePaddle = new Paddle(100, 500, 50, 100, 10, 'green');
var player = new Player();
var brick = new Brick();
var brickArray = [];

var level1 = [
        {x:5, y:50, width:100, height:30, color:'#b34700'},
        {x:110, y:50, width:100, height:30, color:'#803300'},
        {x:215, y:50, width:100, height:30, color:'#994d00'},
        {x:320, y:50, width:100, height:30, color:'#993d00'},
        {x:425, y:50, width:100, height:30, color:'#b34700'},
        {x:530, y:50, width:100, height:30, color:'#994d00'},
        {x:635, y:50, width:100, height:30, color:'#803300'},
        {x:5, y:85, width:100, height:30, color:'#994d00'},
        {x:110, y:85, width:100, height:30, color:'#b34700'},
        {x:215, y:85, width:100, height:30, color:'#993d00'},
        {x:320, y:85, width:100, height:30, color:'#803300'},
        {x:425, y:85, width:100, height:30, color:'#993d00'},
        {x:530, y:85, width:100, height:30, color:'#994d00'},
        {x:635, y:85, width:100, height:30, color:'#b34700'},
        {x:5, y:120, width:100, height:30, color:'#803300'},
        {x:110, y:120, width:100, height:30, color:'#993d00'},
        {x:215, y:120, width:100, height:30, color:'#b34700'},
        {x:320, y:120, width:100, height:30, color:'#994d00'},
        {x:425, y:120, width:100, height:30, color:'#803300'},
        {x:530, y:120, width:100, height:30, color:'#b34700'},
        {x:635, y:120, width:100, height:30, color:'#993d00'}
];

level1.forEach(function(brick) { 
  brickArray.push(new Brick(brick.x, brick.y, brick.width, brick.height, brick.color))
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

  brickArray.forEach((brick, index) => {
    if (brick.collisionDetection(newBall, brickArray)) {
      brickArray.splice(index, 1);
      player.score += 50;
      }
    });


}

requestAnimationFrame(gameLoop)