var GamePieces = require('./GamePieces.js');

class Brick extends GamePieces {
  constructor(x, y, height, width, color) {
    super(x, y, height, width, color)
  }

  collisionDetection(ball) {
    if (ball.x + ball.radius > this.x 
      && ball.x - ball.radius < this.x + this.width
      && ball.y + ball.radius > this.y 
      && ball.y - ball.radius < this.y + this.height) {

      return true;
    } 

    return false;
  }
}

module.exports = Brick;