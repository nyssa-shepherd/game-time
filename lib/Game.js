// class scripts
const Player = require('./Player.js')
const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const Brick = require('./Brick.js');
const levelArray = require('./Level.js');
const startScreen = document.getElementById('start-screen');
const level2Screen = document.getElementById('level2-screen');
const level3Screen = document.getElementById('level3-screen');
const winScreen = document.getElementById('win-screen');
const pauseScreen = document.getElementById('pause-screen');
const trumpty = document.getElementById('trumpty');

module.exports = class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.newBall = new Ball(30, 300, 4.8, 5, 5, Math.PI * 2, false, 'green');
    this.thePaddle = new Paddle(100, 500, 50, 10, 100, '#994e1b');
    this.player = new Player();
    this.brick = new Brick();
    this.brickArray = [];
    this.gameCounter = 0;
    this.level = 0;
    this.mouseX = 0;
    this.isPaused = true;
  }

  startGame() {
    if (this.gameCounter === 0) {
      startScreen.style.display = 'none';
      this.gameLoop();
      this.buildBricks();
      this.gameCounter++;
    } 
  }

  showLevelsScreen() {
    if (this.level === 1) {
      level2Screen.style.display = 'block';
      setTimeout(() => {
        this.newBall.reset();
        this.buildBricks();
        level2Screen.style.display = 'none';  
      }, 3000);
    } else if (this.level === 2) {
      level3Screen.style.display = 'block';
      setTimeout(() => {
        this.newBall.reset();
        this.buildBricks();
        level3Screen.style.display = 'none';  
      }, 3000);
    } else if (this.level > 2) {
      winScreen.style.display = 'block';
      trumpty.classList.add('trumpty-animation');
    }
  }

  pauseGame() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      pauseScreen.style.display = 'block';
    } else {
      pauseScreen.style.display = 'none';
    }
  }


  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.newBall
      .drawBall(this.context)
    
    if (this.isPaused === false ) {
      this.newBall.move();
    }
    
    this.thePaddle
      .draw(this.context)

    this.brickArray.forEach((brick) =>
      brick.draw(this.context)
    );

    this.newBall.paddleTouch(this.thePaddle);

    this.player.drawIndicatorsText(this.context);

    if (this.newBall.y + this.newBall.radius > 600) {
      this.player.playerDie();

      if (this.player.livesRemaining > 0) {
        this.newBall.reset();
        this.isPaused = true;
      }
    }

    this.brickArray.forEach((brick, index) => {
      if (brick.collisionDetection(this.newBall)) {
        this.brickArray.splice(index, 1);
        this.newBall.dy = -this.newBall.dy;
        this.player.score += 50;
        this.levelsLoop();
      }
    });

    requestAnimationFrame(this.gameLoop.bind(this));

  }

  buildBricks() {
    const self = this;

    if (this.brickArray.length === 0 && this.level < 3) {
      levelArray[this.level].forEach(function(brick) { 
        self.brickArray.push(new Brick(
          brick.x, 
          brick.y, 
          brick.height, 
          brick.width, 
          brick.color))
      });
    }
  }

  levelsLoop() {
    if (this.brickArray.length === 0 && this.level < 3) {
      this.level++;
      this.player.livesRemaining = 3;
      this.showLevelsScreen();
    } 
  }
}