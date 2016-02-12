function Food() {
  this.x = getRandomArbitrary(10,391);
  this.y = getRandomArbitrary(10,391);
  this.width = 10;
  this.height = 10;
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
