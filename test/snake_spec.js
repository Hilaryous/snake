import {expect} from 'chai';
import {Snake} from '../lib/snake';
import {Key} from '../lib/user-input-helpers';

describe('Snake', () => {
  it('has a first at creation', () => {
    const snake = new Snake();
    expect(snake.length).to.equal(1)
    expect(snake).to.have.deep.property('first.x', 0)
    expect(snake).to.have.deep.property('first.y', 0)
    expect(snake).to.have.deep.property('last.x', 0)
    expect(snake).to.have.deep.property('last.y', 0)
  });

  it('grows by 1', () => {
    const snake = new Snake(10,10).grow();
    expect(snake.length).to.equal(2)
    expect(snake).to.have.deep.property('first.x', 10)
    expect(snake).to.have.deep.property('first.y', 10)
    expect(snake).to.have.deep.property('last.x', 0)
    expect(snake).to.have.deep.property('last.y', 10)
  });

  it('grows by 2', () => {
    const snake = new Snake(20,20).grow().grow();
    expect(snake.length).to.equal(3)
    expect(snake).to.have.deep.property('first.x', 20)
    expect(snake).to.have.deep.property('first.y', 20)
    expect(snake).to.have.deep.property('first.next.x', 10)
    expect(snake).to.have.deep.property('first.next.y', 20)
    expect(snake).to.have.deep.property('last.x', 0)
    expect(snake).to.have.deep.property('last.y', 20)
  });

  it('grows by one when it eats food', () => {
    const snake = new Snake(10,10);
    snake.isEating = true
    expect(snake.length).to.equal(2)
    expect(snake).to.have.deep.property('first.x', 10)
    expect(snake).to.have.deep.property('first.y', 10)
    expect(snake).to.have.deep.property('last.x', 0)
    expect(snake).to.have.deep.property('last.y', 10)
  });

  it('moves based of user input', () => {
    const snake = new Snake(10,10).grow().grow();
    const key = Key
    key._pressed = {39: true} //right
    snake.move(Key)
    key._pressed = {40: true} //down
    snake.move(Key)
    expect(snake).to.have.deep.property('first.x', 11)
    expect(snake).to.have.deep.property('first.y', 10)
    expect(snake).to.have.deep.property('last.x', 1)
    expect(snake).to.have.deep.property('last.y', 10)
  });

});

