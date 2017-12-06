const canvas = document.getElementById('game');
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
  new Game(ctx, canvas, canvas.width, canvas.height)
  game.startGame();
});