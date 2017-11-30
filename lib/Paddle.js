var GamePieces = require('./GamePieces.js');

class Paddle extends GamePieces {
  constructor(x, y, dx, height, width, color) {
    super(x, y, height, width, color);
    this.dx = dx;
  } 

  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.height, this.width, this.color);
    console.log;
    return this;
  }

  movePaddleLeft() {
    if (this.x > 0) {
      this.x -= 10;
    }
  }

  movePaddleRight() {
    if (this.x < 500) {
      this.x += 10;
    }
  }

  slidePaddleLeft() {
     if (this.x > 0) {
     this.x -= this.dx;
    }
  }  

  slidePaddleRight() {
    if (this.x < 500) {
       this.x += this.dx;
    }
  }  
}


module.exports = Paddle
