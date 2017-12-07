// class scripts
const GamePieces = require('./GamePieces.js');
const Player = require('./Player.js')
const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const Brick = require('./Brick.js');
const levelArray = require('./Level.js');
const startScreen = document.getElementById('start-screen');
const level2Screen = document.getElementById('level2-screen');
const level3Screen = document.getElementById('level3-screen');
const gameOverScreen = document.getElementById('gameover-screen');
const winScreen = document.getElementById('win-screen');

module.exports = class Game {
  constructor(canvas, context, width, height) {
    this.canvas = canvas;
    this.context = context;
    this.newBall = new Ball(10, 300, 4.8, 5, 5, Math.PI * 2, false, 'green');
    this.thePaddle = new Paddle(100, 500, 0, 10, 100, 'green');
    this.player = new Player();
    this.brick = new Brick();
    this.brickArray = [];
    this.gameCounter = 0;
    this.level = 0;
    this.mouseX = 0;
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
    } else if (this.level > 2){
       winScreen.style.display = 'block';
    }
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.newBall
      .drawBall(this.context)
      .move();
    this.thePaddle
      .draw(this.context)

    this.brickArray.forEach((brick) =>
      brick.draw(this.context)
    );

    this.newBall.paddleTouch(this.thePaddle);

    this.player.drawIndicatorsText(this.context);

    if (this.newBall.y + this.newBall.radius > 600) {
      this.player.playerDie();

      if(this.player.livesRemaining > 0) {
        this.newBall.reset();
      }
    }

    this.brickArray.forEach((brick, index) => {
      if(brick.collisionDetection(this.newBall)) {
        this.brickArray.splice(index, 1);
        this.newBall.dy = -this.newBall.dy;
        this.player.score += 50;
        this.levelsLoop();
      };
    });

    requestAnimationFrame(this.gameLoop.bind(this));

  }

  buildBricks() {
    const self = this;
    if (this.brickArray.length === 0 && this.level < 3) {
      levelArray[this.level].forEach(function(brick) { 
        self.brickArray.push(new Brick(brick.x, brick.y, brick.height, brick.width, brick.color))
      });
    } else {
      console.log('you win')
      // must pause game here
    }
  }

  levelsLoop() {
    if(this.brickArray.length === 0 && this.level < 3) {
      this.level++;
      this.showLevelsScreen();
    } 
  }
}