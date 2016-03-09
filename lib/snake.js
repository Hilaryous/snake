import {Block} from './block';

export class Snake {
  constructor(startX=0, startY=0) {
    this.body = [new Block(startX, startY)]
    let [last] = this.body
    this.last = last
    let [head] = this.body
    this.head = head
    this.moveUp = this.verticalMoveBody.bind(this,-1, 10)
    this.moveDown = this.verticalMoveBody.bind(this, 1, 10)
    this.moveLeft = this.horizontalMoveBody.bind(this, -1)
    this.moveRight = this.horizontalMoveBody.bind(this, 1)
  }

  set isEating(value) {
    if (value === true) {
      this.grow()
    }
  }

  grow() {
    let block = new Block(this.last.x - 10, this.last.y);
    this.body.push(block)
    this.last = block
    return this;
  }

  horizontalMoveBody(xOffset) {
    this.body.forEach((block) => {
      block.x += xOffset;
    })
    return this;
  }

  verticalMoveBody(yOffset, tailOffset) {
    let [head, ...tail] = this.body
    head.y += yOffset
    tail.forEach((block) => {
      if (head.x > block.x) {
        block.x += tailOffset;
      } else {
        block.x -= tailOffset;
      }
    })
    return this;
  }

  move(userInput) {
    if (userInput.isDown(userInput.UP)) this.moveUp();
    if (userInput.isDown(userInput.LEFT)) this.moveLeft();
    if (userInput.isDown(userInput.DOWN)) this.moveDown();
    if (userInput.isDown(userInput.RIGHT)) this.moveRight();
  }

  draw(context) {
    this.body.forEach((block) => {
      block.draw(context)
    });
    return this;
  }
}
