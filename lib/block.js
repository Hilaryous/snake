export function Block(x=0,y=0,width=10,height=10) {
  this.next = null;

  this.y = Math.round(y);
  this.x = Math.round(x);
  this.width = width;
  this.height = height;

  this.moveUp    = this.move.bind(this, 0, -1);
  this.moveDown  = this.move.bind(this, 0, 1);
  this.moveLeft  = this.move.bind(this, -1, 0);
  this.moveRight = this.move.bind(this, 1, 0);
}

Block.prototype.move = function(xOffset, yOffset) {
  this.x += xOffset;
  this.y += yOffset;
  return this;
}

Block.prototype.draw = function(context) {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}
