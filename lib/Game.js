// class scripts
const Player = require('./Player.js')
const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const Brick = require('./Brick.js');
const levelArray = require('./Level.js');

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
    this.screen = false;
  }

  startGame() {
    if (this.gameCounter === 0) {
      this.buildBricks();
      this.gameCounter++;
    }
  }

  showLevelsScreen() {
    if (this.level === 1) {
      this.screen = true;
      this.isPaused = true;
      setTimeout(() => {
        this.buildBricks();
        this.screen = false;
      }, 3000);
    } else if (this.level === 2) {
      this.screen = true;
      this.isPaused = true;
      setTimeout(() => {
        this.buildBricks();
        this.screen = false;
      }, 3000);
    } else if (this.level > 2) {
      this.isPaused = true;
      this.screen = true;
    } else {
      this.screen = false;
    }
  }

  checkDeath() {
    if (this.newBall.y + this.newBall.radius > 600) {
      this.player.playerDie();
      this.newBall.reset();
      this.isPaused = true;
    }
  }

  brickCollision() {
    this.brickArray.forEach((brick, index) => {
      if (brick.collisionDetection(this.newBall)) {
        this.brickArray.splice(index, 1);
        this.newBall.dy = -this.newBall.dy;
        this.player.score += 50;
        this.levelCheck();
      }
    });
  }

  moveBall() {
    if (this.isPaused === false ) {
      this.newBall.move();
    }
  }
   
  drawBricks() {
    this.brickArray.forEach((brick) =>
      brick.draw(this.context)
    );
  }

  buildBricks() {
    if (this.brickArray.length === 0 && this.level < 3) {
      levelArray[this.level].forEach((brick) => { 
        this.brickArray.push(new Brick(
          brick.x, 
          brick.y, 
          brick.height, 
          brick.width, 
          brick.color))
      });
    }
  }

  levelCheck() {
    if (this.brickArray.length === 0 & this.level < 3) {
      this.newBall.reset();
      this.level++;
      this.showLevelsScreen();
    } 
  }
}