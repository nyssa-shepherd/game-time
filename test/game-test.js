const { expect } = require('chai');
const { assert } = require('chai');
const Game = require('../lib/Game.js');
const Brick = require('../lib/Brick.js');

let game;
let brick;

describe('Game', function() {
  beforeEach(() => {
    game = new Game()
  });

  it('should exist as game', function() {
    expect(new Game()).to.be.an.instanceof(Game);
  });

  it('should have a start game function', function() {
    assert.isFunction(game.startGame);
  })

  it('should increase game counter when game starts', function() {
    expect(game.gameCounter).to.equal(0);
    game.startGame();
    expect(game.gameCounter).to.equal(1);
  });

  it('should have a show levels function', function() {
    //if game is paused
    //check if bricks get built in new level
    //set timeout??
    assert.isFunction(game.showLevelsScreen);
    // expect(game.isPaused).to.equal(true);
    // expect(game.screen).to.equal(false);
    // game.showLevelsScreen();
    // expect(game.screen).to.equal(true);
  });

  it('should', function() {
    game.showLevelsScreen();
    expect(game.level).to.equal(1);
    expect(game.screen).to.equal(true);
  })

  it('should have a check death function', function() {
    assert.isFunction(game.checkDeath);
  });

  it('should reset the ball after death', function() {
    expect(game.newBall.x).to.equal(30);
    expect(game.newBall.y).to.equal(300);
    game.newBall.move();
    expect(game.newBall.x).to.equal(34.8);
    expect(game.newBall.y).to.equal(305);
    game.checkDeath();
    game.newBall.reset();
    expect(game.newBall.x).to.equal(30);
    expect(game.newBall.y).to.equal(300);
  })

  it('should have a brick collision function', function() {
    //check length of array
    assert.isFunction(game.brickCollision);
  });

  it('should increase the score by 50 after hitting a brick', function() {
    expect(game.player.score).to.equal(0);
    game.brickCollision();
    expect(game.player.score).to.equal(50);
  });

  it('should have a move ball function', function() {
    assert.isFunction(game.moveBall);
  });

  it('should have a draw bricks function', function() {
    assert.isFunction(game.drawBricks);
  });

  it.only('should have a brick array the same length as the level array', function() {
    expect(game.brickArray).to.have.lengthOf(game.levelArray[game.level].length);
  });

  it('should have a build bricks function', function() {
    //check brick array length for added bricks
    assert.isFunction(game.buildBricks);
  });

  it('should have a new instance of brick', function() {
    var brick = new Brick();
  });

  it('should add a new brick to the brick array', function() {
    game.buildBricks();
    expect(game.brickArray.length).to.equal(game.levelArray.length);
  });

  it('should have a level check function', function() {
    //check for empty brick array and go up a level if empty
    assert.isFunction(game.levelCheck);
  });

  it('should increase the level by one if the brick array is empty', function() {
    expect()
  });

});