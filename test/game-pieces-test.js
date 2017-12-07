const { expect } = require('chai');
const GamePieces = require('../lib/GamePieces.js');

describe('GamePieces', function() {

  beforeEach(() => 
    gamepiece = new GamePieces(),
  );

  it('should exist as a gamepiece', function() {
    expect(new GamePieces()).to.be.an.instanceOf(gamepiece);
  });
});
