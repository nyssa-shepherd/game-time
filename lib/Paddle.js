var GamePieces = require('./GamePieces.js');

class Paddle extends GamePieces {
  constructor(x, y, dx, height, width, color) {
    super(x, y, height, width, color);
    this.dx = dx;
  } 

  hoverPaddle(mouseX) {
    if (mouseX < 1080 && mouseX > 380) {
      this.x = mouseX - 400;
    }
  } 

  slidePaddleLeft() {
    if (this.x > 0) {
      this.x -= this.dx;
    }
  }  

  slidePaddleRight() {
    if (this.x < 650) {
      this.x += this.dx;
    }
  } 
}

module.exports = Paddle
