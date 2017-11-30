var GamePieces = require('./GamePieces.js');


class Brick extends GamePieces {
  constructor(x, y, height, width, color) {
    super(x, y, height, width, color)
  }
}

module.exports = Brick;