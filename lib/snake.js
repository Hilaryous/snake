function Snake(x,y,width) {
  this.x = Math.round(x);
  this.y = Math.round(y);
  this.width = width;
  this.height = 10;
}

Snake.prototype.moveUp = function () {
  this.y -= 1;
  return this;
}

Snake.prototype.moveDown = function () {
  this.y += 1;
  return this;
}

Snake.prototype.moveLeft = function () {
  this.x -= 1;
  return this;
}

Snake.prototype.moveRight = function () {
  this.x += 1;
  return this;
}

Snake.prototype.move = function (Key) {
  if (Key.isDown(Key.UP)) this.moveUp();
  if (Key.isDown(Key.LEFT)) this.moveLeft();
  if (Key.isDown(Key.DOWN)) this.moveDown();
  if (Key.isDown(Key.RIGHT)) this.moveRight();
}

Snake.prototype.grow = function () {
  // add a new block to the end of the snake
  return this;
}

