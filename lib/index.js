var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var GamePieces = require('./GamePieces.js');
var Player = require('./Player.js')
var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');
var levelArray = require('./Level.js');
var mouseX = 0;
var level = 0;
var gameCounter = 0;

var newBall = new Ball(10, 300, 4.8, 5, 0, Math.PI * 2, false, 'green');
var thePaddle = new Paddle(100, 500, 50, 10, 100, 'green');
var player = new Player();
var brick = new Brick();
var brickArray = [];

window.addEventListener('mousemove', setMousePosition, false);

function setMousePosition(e) {
  mouseX = e.clientX;
  thePaddle.hoverPaddle(mouseX);
}

window.addEventListener('keydown', function(event) {
  if (event.keyCode == 37) {
    thePaddle.slidePaddleLeft();
  } else if (event.keyCode == 39) {
    thePaddle.slidePaddleRight();
  }
});

window.onload =  function(event) {
  // display intro screen with click to start instructions & mean tweet
}

canvas.addEventListener('click', startGame);

function startGame(level) { 
  if (gameCounter === 0) {
    gameLoop();
    buildBricks();
    gameCounter++;
  } 
};


function levelsLoop() {
  // show next level screen

  level++;  

  // move to buildLevel function  
  if(brickArray.length === 0 && level < 3) {
    console.log('level up')
    buildBricks();

  } else if (level === 3) {
    // win game
  }
};

function buildBricks() {
  // levelsLoop();
  // console.log('build bricks level console log', level)
  levelArray[level].forEach(function(brick) { 
    brickArray.push(new Brick(brick.x, brick.y, brick.height, brick.width, brick.color))
  });
};

function gameLoop() {
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
    if(brick.collisionDetection(newBall)) {
      brickArray.splice(index, 1);
      newBall.dy = -newBall.dy;
      player.score += 50;
      levelsLoop();
    };
  });

  requestAnimationFrame(gameLoop);
}

// requestAnimationFrame(gameLoop);

