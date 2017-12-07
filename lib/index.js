const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const Game = require('./Game.js')
const game = new Game(canvas, ctx, canvas.width, canvas.height)

window.addEventListener('mousemove', setMousePosition, false);

function setMousePosition(event) {
  game.mouseX = event.clientX;
  game.thePaddle.hoverPaddle(game.mouseX);
}

window.addEventListener('keydown', useArrows)


function useArrows(event) {
  if (event.keyCode == 37) {
    game.thePaddle.slidePaddleLeft();
  } else if (event.keyCode == 39) {
    game.thePaddle.slidePaddleRight();
  }
}

window.addEventListener('click', function() {
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



