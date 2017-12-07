var GamePieces = require('./GamePieces.js');

class Paddle extends GamePieces {
  constructor(x, y, dx, height, width, color) {
    super(x, y, height, width, color);
    this.dx = dx;
  } 

  hoverPaddle(mouseX) {
    this.x = mouseX - 600;
    if (this.x <= 0) {
      this.x = 0;
    } else if (this.x + this.width >= 750) {
      this.x = 750 - this.width;
    }
  } 
}

module.exports = Paddle;
