var canvas = document.getElementById('game');
const startScreen = document.getElementById('start-screen');
const ctx = canvas.getContext('2d');
const GamePieces = require('./GamePieces.js');
const Player = require('./Player.js')
const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const Brick = require('./Brick.js');
const levelArray = require('./Level.js');
const Game = require('./Game.js')
const game = new Game(canvas, ctx, canvas.width, canvas.height)
const mouseX = 0;
const level = 0;
const gameCounter = 0;

// var newBall = new Ball(10, 300, 4.8, 5, 0, Math.PI * 2, false, 'green');
// var thePaddle = new Paddle(100, 500, 50, 10, 100, 'green');
// var player = new Player();
// var brick = new Brick();
// var brickArray = [];

window.addEventListener('mousemove', setMousePosition, false);

function setMousePosition(event) {
  game.mouseX = event.clientX;
  game.thePaddle.hoverPaddle(game.mouseX);
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

window.addEventListener('click', function(event) {
  game.startGame();
});

// function startGame(level) { 
//   if (gameCounter === 0) {
//     gameLoop();
//     buildBricks();
//     startScreen.style.display = 'none';
//     gameCounter++;
//   } 
  
// };

function levelsLoop() {
  // show next level screen

  level++;  

  // move to buildLevel function  
  if(brickArray.length === 0 && level < 3) {
    console.log('level up')
    buildBricks();

  }
};

function buildBricks() {
  levelArray[level].forEach(function(brick) { 
    brickArray.push(new Brick(brick.x, brick.y, brick.height, brick.width, brick.color))
  });
};

function gameLoop() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // newBall.drawBall(ctx).move();
  // thePaddle.draw(ctx);

  // brickArray.forEach((brick) =>
  //   brick.draw(ctx)
  // );

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

