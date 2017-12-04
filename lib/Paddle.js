var GamePieces = require('./GamePieces.js');

class Paddle extends GamePieces {
  constructor(x, y, dx, height, width, color) {
    super(x, y, height, width, color);
    this.dx = dx;
  } 
 

  movePaddleLeft() {
    if (this.x > 0) {
      this.x -= 10;
    }
  }

  movePaddleRight() {
    if (this.x < 650) {
      this.x += 10;
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
