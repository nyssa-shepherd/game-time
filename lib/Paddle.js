var GamePieces = require('./GamePieces.js');

class Paddle extends GamePieces {
  constructor(x, y, dx, height, width, color) {
    super(x, y, height, width, color);
    this.dx = dx;
  } 

  move() {
    if (this.x > 0 && this.x < 650) {
      this.x += this.dx;
    }

    if (this.dx > 0) {
      this.dx--;

    } else if (this.dx < 0) {
      this.dx++;
    }
  }


  // hoverPaddle(mouseX) {

  //   if (mouseX < 1080 && mouseX > 380) {
  //     this.x = mouseX -400;
  //   }
  // } 

  slidePaddleLeft() {
    if (this.dx > 0) { this.dx = 0 }
    this.dx -= 10;
    console.log(this.dx);
    // if (this.x > 0) {
      // this.x -= this.dx;
    // }
  }  

  slidePaddleRight() {
    if (this.dx < 0) { this.dx = 0 }
    this.dx += 10;
    console.log(this.dx);
    // if (this.x < 650) {
    //    this.x += this.dx;
    // }
  } 
}

module.exports = Paddle
