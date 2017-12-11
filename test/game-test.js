const { expect } = require('chai');
const { assert } = require('chai');
const Game = require('../lib/Game.js');

let game;

describe('Game', function() {
  beforeEach(() => {
    game = new Game();
  });

  it.only('should exist as game', function() {
    expect(new Game()).to.be.an.instanceof(Game);
  });

  it('should have a start game function', function() {
    //test value of counter
  });

  it('should have a show levels function', function() {
    //if game is paused
    //check if bricks get built in new level
    //set timeout??
  });

  it('should have a check death function', function() {
    //check ball position reset
  });

  it('should have a brick collision function', function() {
    //check score increase
    //check length of array
  });

  it('should have a move ball function', function() {
    //check velocity 
  });

  it('should have a draw bricks function', function() {
    //check that brick when drawn have a height, width, x, y
  });

  it('should have a build bricks function', function() {
    //check for new instance of brick
    //check brick array length for added bricks
  });

  it('should have a level check function', function() {
    //check for empty brick array and go up a level if empty
  });

});