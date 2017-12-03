var GamePieces = require('./GamePieces.js');

class Brick extends GamePieces {
  constructor(x, y, height, width, color) {
    super(x, y, height, width, color)
  }

  collisionDetection(ball) {
    if (ball.x > this.x 
      && ball.x < this.x + this.width 
      && ball.y + ball.radius > this.y 
      && ball.y - ball.radius < this.y + this.height) {
      ball.dy = -ball.dy;
      return true;
    } else if (ball.y > this.y 
      && ball.y < this.y + this.height 
      && ball.x + ball.radius > this.x 
      && ball.x - ball.radius < this.x + this.width) {
      ball.dx = -ball.dx;
      return true;
    }
  }
}

module.exports = Brick;