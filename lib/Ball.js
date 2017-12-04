var GamePieces = require('./GamePieces.js');

class Ball extends GamePieces {
  constructor(x, y, dx, dy, color) {
    super(x, y, color);
    this.dx = dx;
    this.dy = dy;
    this.radius = 10;
    this.color = color;
  }

  drawBall(ctx) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false, this.color);
    ctx.strokeStyle = 'blue';
    ctx.closePath();
    ctx.fill();
    return this;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > 750 || this.x - this.radius < 0) {
      this.dx = -this.dx;
    } 
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    } 
  }

  reset(){
    this.x = 10;
    this.y = 300;
    // this.dx = 0;
    // this.dy = 0;
  }

  paddleTouch(paddle) {
    let p0 = paddle.x - 20;
    // these other p values are for later to develop more dynamic ball movement
    // let p20 = paddle.x + 20
    // let p40 = paddle.x + 40
    // let p60 = paddle.x + 60
    // let p80 = paddle.x + 80
    let p100 = paddle.x + 120;

    if (this.y + this.radius === paddle.y) {
      if (this.x > p0 && this.x < p100) {
        this.dy = -this.dy;
      }
    } 
  }
}

module.exports = Ball;