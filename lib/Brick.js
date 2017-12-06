var GamePieces = require('./GamePieces.js');

class Brick extends GamePieces {
  constructor(x = 0, y = 0, height = 30, width = 100, color = 'blue') {
    super(x, y, height, width, color)
    return this;
  }

  collisionDetection(ball) {
    if (ball.x + ball.radius > this.x 
      && ball.x - ball.radius < this.x + this.width
      && ball.y + ball.radius > this.y 
      && ball.y - ball.radius < this.y + this.height) {

      return true;
    } 
  }
}

module.exports = Brick;