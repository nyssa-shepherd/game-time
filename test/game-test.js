const { expect } = require('chai');
const { assert } = require('chai');
const Game = require('../lib/Game.js');
const Brick = require('../lib/Brick.js');

let game;
let brick;
let brick2;

describe('Game', function() {
  beforeEach(() => {
    game = new Game()
    brick = new Brick();
    brick2 = new Brick();
  });

  it('should exist as game', function() {
    expect(new Game()).to.be.an.instanceof(Game);
  });

  it('should have a start game function', function() {
    expect(game.startGame).to.be.a('function');
  })

  it('should increase game counter when game starts', function() {
    expect(game.gameCounter).to.equal(0);
    game.startGame();
    expect(game.gameCounter).to.equal(1);
  });

  it('should have a show levels function', function() {
    expect(game.showLevelsScreen).to.be.a('function');
  });

  it('should have a check death function', function() {
    expect(game.checkDeath).to.be.a('function');
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
    expect(game.brickCollision).to.be.a('function');
  });

  it('should have a move ball function', function() {
    expect(game.moveBall).to.be.a('function');
  });

  it('should have a draw bricks function', function() {
    expect(game.drawBricks).to.be.a('function');
  });

  it('should have a brick array the same length as the level array', function() {
    expect(game.game.brickArray).to.have.lengthOf(game.levelArray[game.level].length);
  });

  it('should have a build bricks function', function() {
    expect(game.buildBricks).to.be.a('function');
  });

  // it('should have a new instance of brick', function() {
  //   var brick = new Brick();
  // });

  it('should add a new brick to the brick array', function() {
    game.buildBricks();
    expect(game.brickArray.length).to.equal(game.levelArray.length);
  });

  it('should have a level check function', function() {
    expect(game.levelCheck).to.be.a('function');
  });

  it.only('should increase a level when the brick array is empty', function() {
    game.buildBricks();
    console.log(game.brickArray)
    expect(game.brickArray.length).to.equal(1);
    expect(game.level).to.equal(0);
    game.brickCollision();
    console.log(game.brickArray)
    // expect(game.brickArray.length).to.equal(0);
    // game.levelCheck();
    // expect(game.level).to.equal(1);
  });

});