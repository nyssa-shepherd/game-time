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
var brick = new Brick();
var brickArray = [];
var level1 = [
        {x:5, y:50, width:90, height:30, color:'pink'},
        {x:105, y:50, width:90, height:30, color:'pink'},
        {x:205, y:50, width:90, height:30, color:'pink'},
        {x:305, y:50, width:90, height:30, color:'pink'},
        {x:405, y:50, width:90, height:30, color:'pink'},
        {x:505, y:50, width:90, height:30, color:'pink'},
        {x:5, y:100, width:90, height:30, color:'pink'},
        {x:105, y:100, width:90, height:30, color:'pink'},
        {x:205, y:100, width:90, height:30, color:'pink'},
        {x:305, y:100, width:90, height:30, color:'pink'},
        {x:405, y:100, width:90, height:30, color:'pink'},
        {x:505, y:100, width:90, height:30, color:'pink'}
];

level1.forEach(function(brick) { 
  brickArray.push(new Brick(brick.x, brick.y, brick.width, brick.height, brick.color))
})

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
  player.drawIndicatorsText(ctx);

  if (newBall.y + newBall.radius > 600) {
    player.playerDie();
  }

  brickArray.forEach((brick, index) => {
    if (brick.collisionDetection(newBall, brickArray)) {
      brickArray.splice(index, 1);
      player.score += 50;
      }
    });
}

requestAnimationFrame(gameLoop)