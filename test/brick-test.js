const { expect } = require('chai');
const { assert } = require('chai');
const Brick = require('../lib/Brick.js');
const Ball = require('../lib/Ball.js')

let brick;
let ball;

describe('Brick', function() {

  beforeEach(() => {
    brick = new Brick(5, 50, 30, 90, 'pink');
    ball = new Ball(5, 50, 10, 10)
  })

  it('should be a function', function() {
    assert.isFunction(Brick);
  });

  it('should have a starting x position', function() {
    expect(brick.x).to.equal(5);
  });

  it('should have a starting y position', function() {
    expect(brick.y).to.equal(50);
  });

  it('should have a height', function() {
    expect(brick.height).to.equal(30);
  });
  
  it('should have a width', function() {
    expect(brick.width).to.equal(90);
  });

  it('should have a color', function() {
    expect(brick.color).to.equal('pink');
  });

  it('should return true if brick collides with the ball', function() {
    expect(ball.x).to.equal(5);
    expect(ball.y).to.equal(50);
    expect(brick.x).to.equal(5);
    assert.equal(brick.collisionDetection(ball), true);
  });
});


