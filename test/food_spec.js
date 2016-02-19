import {expect} from 'chai';
import {Food} from '../lib/food';

describe('Food', () => {
  it('has random coordinates within board', () => {
    const food = new Food();
    expect(food.x).to.be.a('number');
    expect(food.x).to.be.within(10, 391);
    expect(food.y).to.be.a('number');
    expect(food.y).to.be.within(10, 391);
  });
});
