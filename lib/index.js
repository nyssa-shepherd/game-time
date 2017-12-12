const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const Game = require('./Game.js')
const game = new Game(canvas, ctx, canvas.width, canvas.height)
const startScreen = document.getElementById('start-screen');
const level2Screen = document.getElementById('level2-screen');
const level3Screen = document.getElementById('level3-screen');
const winScreen = document.getElementById('win-screen');
const pauseScreen = document.getElementById('pause-screen');
const trumpty = document.getElementById('trumpty');
const gameOverScreen = document.getElementById('gameover-screen');


window.addEventListener('mousemove', setMousePosition, false);

window.onload = function() {
  startScreen.style.display = 'block';
}

window.addEventListener('click', function() {
  startScreen.style.display = 'none';
  new Game(ctx, canvas, canvas.width, canvas.height);
  animate();
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode == 32) {
    event.preventDefault();
    pauseGame();
  }
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode == 13) {
    window.location.reload(true);
  }
});

function animate() {
  game.startGame();
  game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.newBall.drawBall(game.context)
  game.moveBall();
  game.thePaddle.draw(game.context)
  game.drawBricks();
  game.newBall.paddleTouch(game.thePaddle);
  game.player.drawIndicatorsText(game.context);
  game.checkDeath();
  game.brickCollision();
  showCorrectScreen();
  requestAnimationFrame(animate);
}

function pauseGame() {
  game.isPaused = !game.isPaused;
  if (game.isPaused) {
    pauseScreen.style.display = 'block';
  } else {
    pauseScreen.style.display = 'none';
  }
}

function setMousePosition(event) {
  game.mouseX = event.clientX;
  game.thePaddle.hoverPaddle(game.mouseX);
}

function showCorrectScreen() {
  if (game.screen === true && game.level === 1) {
    level2Screen.style.display = 'block';
  } else if (game.screen === true && game.level === 2) {
    level3Screen.style.display = 'block';
  } else if (game.screen === true && game.level > 2) {
    winScreen.style.display = 'block';
    trumpty.classList.add('trumpty-animation');
  } else if (game.gameOver === true) {
    gameOverScreen.style.display = 'block';
  } else if (game.screen === false) {
    level2Screen.style.display = 'none';
    level3Screen.style.display = 'none';
    winScreen.style.display = 'none'; 
  }
}
