// class scripts
var GamePieces = require('./GamePieces.js');
var Player = require('./Player.js')
var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');
var levelArray = require('./Level.js');

// variables
// var mouseX = 0;
// var level = 0;
// var gameCounter = 0;
// var myBrickArray = this.brickArray;

const startScreen = document.getElementById('start-screen');


module.exports = class Game {
  constructor(canvas, context, width, height) {
    this.canvas = canvas;
    this.context = context;
    this.newBall = new Ball(10, 300, 4.8, 5, 5, Math.PI * 2, false, 'green');
    this.thePaddle = new Paddle(100, 500, 50, 10, 100, 'green');
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

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.newBall
      .drawBall(this.context)
      .move();
    this.thePaddle
      .draw(this.context);

    // this.brickArray.forEach((brick) =>
    // this.brick.draw(this.context)

    this.newBall.paddleTouch(this.thePaddle);

    requestAnimationFrame(this.gameLoop.bind(this));
  // );

  }

  // build bricks not working. getting an error telling me everything is undefined.

  // buildBricks() {
    // var myBrickArray = this.brickArray;
    // levelArray[this.level].forEach(function(brick) { 
    //   myBrickArray.push(new Brick(this.brick.x, this.brick.y, this.brick.height, this.brick.width, this.brick.color))
    // });

  // }

  levelsLoop() {

  }
}