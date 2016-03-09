import {expect} from 'chai';
import {Snake} from '../lib/snake';
import {Key} from '../lib/user-input-helpers';

describe('Snake', () => {
  it('has a head at creation', () => {
    const snake = new Snake();
    expect(snake.body.length).to.equal(1)
    expect(snake).to.have.deep.property('last.x', 0)
    expect(snake).to.have.deep.property('last.y', 0)
  });

  it('grows by 1', () => {
    const snake = new Snake(10,10).grow();
    expect(snake.body.length).to.equal(2)
    expect(snake).to.have.deep.property('head.x', 10)
    expect(snake).to.have.deep.property('head.y', 10)
    expect(snake).to.have.deep.property('last.x', 0)
    expect(snake).to.have.deep.property('last.y', 10)
  });

  it('grows by 2', () => {
    const snake = new Snake(20,20).grow().grow();
    expect(snake.body.length).to.equal(3)
    expect(snake).to.have.deep.property('head.x', 20)
    expect(snake).to.have.deep.property('head.y', 20)
    expect(snake).to.have.deep.property('last.x', 0)
    expect(snake).to.have.deep.property('last.y', 20)
  });

  it('grows by one when it eats food', () => {
    const snake = new Snake(10,10);
    snake.isEating = true
    expect(snake.body.length).to.equal(2)
    expect(snake).to.have.deep.property('head.x', 10)
    expect(snake).to.have.deep.property('head.y', 10)
    expect(snake).to.have.deep.property('last.x', 0)
    expect(snake).to.have.deep.property('last.y', 10)
  });

  it('moves right based off user input', () => {
    const snake = new Snake(40,10).grow().grow();
    const key = Key
    key._pressed = {39: true} //right
    snake.move(Key)
    expect(snake).to.have.deep.property('head.x', 41)
    expect(snake).to.have.deep.property('head.y', 10)
    expect(snake).to.have.deep.property('body[1].x', 31)
    expect(snake).to.have.deep.property('body[1].y', 10)
    expect(snake).to.have.deep.property('last.x', 21)
    expect(snake).to.have.deep.property('last.y', 10)
  });

  it('moves left based off user input', () => {
    const snake = new Snake(40,10).grow().grow();
    const key = Key
    key._pressed = {37: true} //left
    snake.move(Key)
    expect(snake).to.have.deep.property('head.x', 39)
    expect(snake).to.have.deep.property('head.y', 10)
    expect(snake).to.have.deep.property('body[1].x', 29)
    expect(snake).to.have.deep.property('body[1].y', 10)
    expect(snake).to.have.deep.property('last.x', 19)
    expect(snake).to.have.deep.property('last.y', 10)
  });

  it('moves down based off user input', () => {
    const snake = new Snake(40,10).grow().grow();
    const key = Key
    key._pressed = {40: true} //down
    snake.move(Key)
    expect(snake).to.have.deep.property('head.x', 40)
    expect(snake).to.have.deep.property('head.y', 11)
    expect(snake).to.have.deep.property('body[1].x', 40)
    expect(snake).to.have.deep.property('body[1].y', 10)
    expect(snake).to.have.deep.property('last.x', 30)
    expect(snake).to.have.deep.property('last.y', 10)
  });

  it('moves up based off user input', () => {
    const snake = new Snake(40,10).grow().grow();
    const key = Key
    key._pressed = {38: true} //up
    snake.move(Key)
    expect(snake).to.have.deep.property('head.x', 40)
    expect(snake).to.have.deep.property('head.y', 9)
    expect(snake).to.have.deep.property('body[1].x', 40)
    expect(snake).to.have.deep.property('body[1].y', 10)
    expect(snake).to.have.deep.property('last.x', 30)
    expect(snake).to.have.deep.property('last.y', 10)
  });

  it('moves right then down based off user input', () => {
    const snake = new Snake(40,10).grow().grow();
    const key = Key
    key._pressed = {39: true} //right
    snake.move(Key)
    key._pressed = {40: true} //down
    snake.move(Key)
    expect(snake).to.have.deep.property('head.x', 41)
    expect(snake).to.have.deep.property('head.y', 11)
    expect(snake).to.have.deep.property('body[1].x', 41)
    expect(snake).to.have.deep.property('body[1].y', 10)
    expect(snake).to.have.deep.property('last.x', 31)
    expect(snake).to.have.deep.property('last.y', 10)
  });

});

