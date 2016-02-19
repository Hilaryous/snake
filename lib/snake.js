import {Block} from './block';

export function Snake(startX=0, startY=0) {
  let block = new Block(startX, startY)
  this.first = block;
  this.last = block;
  this.length = 1;

  this.moveUp = this.moveBody.bind(this, 0, -1)
  this.moveDown = this.moveBody.bind(this, 0, 1)
  this.moveLeft = this.moveBody.bind(this, -1, 0)
  this.moveRight = this.moveBody.bind(this, 1, 0)
}

Snake.prototype.grow = function () {
  let block = new Block(this.last.x - 10, this.last.y);
  this.last.next = block
  this.last = block
  this.length ++
  return this;
}

Snake.prototype.moveBody = function (xOffset, yOffset) {
  this.first.x += xOffset;
  this.first.y += yOffset;
  return this;
}

let snake = Snake.prototype;
Object.defineProperty(snake, "isEating", {
  set: function(value) {
    if (value === true) {
       this.grow()
    }
  }
});

Snake.prototype.move = function (userInput) {
  if (userInput.isDown(userInput.UP)) this.moveUp();
  if (userInput.isDown(userInput.LEFT)) this.moveLeft();
  if (userInput.isDown(userInput.DOWN)) this.moveDown();
  if (userInput.isDown(userInput.RIGHT)) this.moveRight();
}

Snake.prototype.draw = function(context) {
  return this;
}
