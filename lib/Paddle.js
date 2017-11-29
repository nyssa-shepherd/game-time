var GamePieces = require('./GamePieces.js');

class Paddle extends GamePieces {
  constructor(x, y, height, width, color) {
    super(x, y, height, width, color);
  } 

  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 580, 80, 10);
    return this;
  }
}

module.exports = Paddle;