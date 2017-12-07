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

  it('should move right when the mouse moves right', function() {
    paddle.x = 500
    expect(paddle.x).to.equal(500);
    mouseX = 550;
    paddle.hoverPaddle(mouseX);
    expect(paddle.x).to.equal(0);
  })

  it('should move left when the mouse moves left', function() {
    paddle.x = 500
    expect(paddle.x).to.equal(500);
    mouseX = 450;
    paddle.hoverPaddle(mouseX);
    expect(paddle.x).to.equal(0);
  })
});


