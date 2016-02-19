import {getRandomNumberWithin} from './helpers';

export function Food(x=0,y=0,width=10,height=10) {
  this.x = getRandomNumberWithin(10,391);
  this.y = getRandomNumberWithin(10,391);
  this.width = width;
  this.height = height;
}

Food.prototype.draw = function (context) {
  context.fillRect(this.x, this.y, this.width, this.height);
}

