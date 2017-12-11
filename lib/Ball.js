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
    ctx.fillStyle = '#ab810e';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = '#ab810e';
    ctx.closePath();
    ctx.fill();
    return this;
  }

  move() {
    console.log('the ball is moving')
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + this.radius > 750 || this.x - this.radius < 0) {
      this.dx = -this.dx;
    } 
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    } 
    if (this.x <= 5) {
      this.x = 6;
    } else if (this.x >= 745) {
      this.x = 744;
    }
    return this;
  }

  reset() {
    this.x = 20;
    this.y = 300;
  }

  paddleTouch(paddle) {
    let p0 = paddle.x - 20;
    let p20 = paddle.x + 20
    let p40 = paddle.x + 40
    let p60 = paddle.x + 60
    let p80 = paddle.x + 80
    let p100 = paddle.x + 120;

    if (this.y + this.radius === paddle.y) {
      if (this.x > p0 && this.x <= p20) {
        this.dy = -this.dy;
        this.dx = -7;
      } else if (this.x > p20 && this.x <= p40) {
        this.dy = -this.dy;
        this.dx = -4.5;
      } else if (this.x > p40 && this.x <= p60) {
        this.dy = -this.dy;
        this.dx = 0;
      } else if (this.x > p60 && this.x <= p80) {
        this.dy = -this.dy;
        this.dx = 4.5;
      } else if (this.x > p80 && this.x <= p100) {
        this.dy = -this.dy;
        this.dx = 7;
      }
    }
  }
}

module.exports = Ball;