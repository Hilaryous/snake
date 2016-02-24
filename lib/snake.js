import {Block} from './block';

export class Snake {
  constructor(startX=0, startY=0) {
    let block = new Block(startX, startY)
    this.first = block;
    this.last = block;
    this.length = 1;

    this.moveUp = this.moveBody.bind(this, 0, -1)
    this.moveDown = this.moveBody.bind(this, 0, 1)
    this.moveLeft = this.moveBody.bind(this, -1, 0)
    this.moveRight = this.moveBody.bind(this, 1, 0)
  }

  set isEating(value) {
    if (value === true) {
       this.grow()
    }
  }

  grow() {
    let block = new Block(this.last.x - 10, this.last.y);
    this.last.next = block
    this.last = block
    this.length ++
    return this;
  }

  moveBody(xOffset, yOffset) {
    this.iterate(function(current) {
      current.x += xOffset;
      current.y += yOffset;
    });
    return this;
  }

  move(userInput) {
    if (userInput.isDown(userInput.UP)) this.moveUp();
    if (userInput.isDown(userInput.LEFT)) this.moveLeft();
    if (userInput.isDown(userInput.DOWN)) this.moveDown();
    if (userInput.isDown(userInput.RIGHT)) this.moveRight();
  }

  draw(context) {
    this.iterate(function(current) {
      current.draw(context)
    });
    return this;
  }

  iterate(cb) {
    let current = this.first
    while(current) {
      cb(current)
      current = current.next
    }
  }
}
