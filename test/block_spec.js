import {expect} from 'chai';
import {Block} from '../lib/block';

describe('Block', () => {
  it('has default values', () => {
    const block = new Block();
    expect(block.x).to.eql(0);
    expect(block.y).to.eql(0);
    expect(block.width).to.eql(10);
    expect(block.height).to.eql(10);
  });

  it('can move up', () => {
    const block = new Block(10, 10);
    expect(block.x).to.eql(10);
    expect(block.y).to.eql(10);
    block.moveUp();
    expect(block.x).to.eql(10);
    expect(block.y).to.eql(9);
  });

  it('can move down', () => {
    const block = new Block(10, 10);
    block.moveDown();
    expect(block.x).to.eql(10);
    expect(block.y).to.eql(11);
  });

  it('can move left', () => {
    const block = new Block(10, 10);
    block.moveLeft();
    expect(block.x).to.eql(9);
    expect(block.y).to.eql(10);
  });

  it('can move right', () => {
    const block = new Block(10, 10);
    block.moveRight();
    expect(block.x).to.eql(11);
    expect(block.y).to.eql(10);
  });

});
