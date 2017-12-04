const { expect } = require('chai');
const { assert } = require('chai');
const Brick = require('../lib/Brick.js');

let brick;

describe('Brick', function() {

  beforeEach(() => {
    brick = new Brick(5, 50, 30, 90, 'pink');
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

// unsure if this is where we should put the brick collision tests 
// probably best to put them in the game file

});