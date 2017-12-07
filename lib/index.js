const canvas = document.getElementById('game');
const startScreen = document.getElementById('start-screen');
const ctx = canvas.getContext('2d');
const GamePieces = require('./GamePieces.js');
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

window.addEventListener('keydown', useArrows)


function useArrows(event) {
  if (event.keyCode == 37) {
    game.thePaddle.slidePaddleLeft();
    console.log('this')
  } else if (event.keyCode == 39) {
    game.thePaddle.slidePaddleRight();
  }
};

window.addEventListener('click', function(event) {
  new Game(ctx, canvas, canvas.width, canvas.height)
  game.startGame();
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode == 32) {
    game.pauseGame();
  }
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode == 13) {
    window.location.reload(true);
  }
});



