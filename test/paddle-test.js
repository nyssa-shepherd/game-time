const { expect } = require('chai');
const { assert } = require('chai');
const Paddle = require('../lib/Paddle.js');

describe('Paddle', function() {

  beforeEach(() => 
    paddle = new Paddle(100, 500, 50, 100, 10, 'green'),
  );

  it('should exist as a paddle', function() {
    expect(new Paddle()).to.be.an.instanceOf(Paddle);
  });

  it('should be a function', function() {
    assert.isFunction(Paddle);
  });

  it('should move left', function() {
    expect(paddle.x).to.equal(100);
    paddle.movePaddleLeft();
    expect(paddle.x).to.equal(90);
  });

  it('should move right', function() {
    expect(paddle.x).to.equal(100);
    paddle.movePaddleRight();
    expect(paddle.x).to.equal(110);
  });

  it('should slide right', function() {
    expect(paddle.x).to.equal(100);
    paddle.slidePaddleRight();
    expect(paddle.x).to.equal(150);
  });

  it('should slide left', function() {
    expect(paddle.x).to.equal(100);
    paddle.slidePaddleLeft();
    expect(paddle.x).to.equal(50);
  });
});