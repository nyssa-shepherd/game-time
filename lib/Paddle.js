var GamePieces = require('./GamePieces.js');

class Paddle extends GamePieces {
  constructor(x, y, height, width, color) {
    super(x, y, height, width, color);
  } 

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(10, 580, 80, 10, 'blue');
    return this;
  }
}

module.exports = Paddle;