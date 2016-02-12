$(document).ready(function() {
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    isDown: function(keyCode) {
      return this._pressed[keyCode];
    },

    onKeydown: function(keyCode) {
      return this._pressed[event.keyCode] = true;
    },

    onKeyup: function(keyCode) {
      delete this._pressed[event.keyCode];
    },

  };

  window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);


  Food.prototype.draw = function () {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  Snake.prototype.draw = function () {
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  var snake = new Snake(0, 0, 10);

  var food = new Food;

  function eatFood() {
    food = null;
    snake.grow();
    food = new Food;
  }

  var withinFive = function(num1, num2, num3, num4) {
    var xdiff = Math.abs(num1 - num2);
    var ydiff = Math.abs(num3 - num4);

    return (xdiff <= 5 && ydiff <= 5);
  }

  function foodisEaten(snake, food) {
    return withinFive(snake.x, food.x, food.y, snake.y);
  }

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0,0, canvas.width, canvas.height);
    snake.draw().move(Key);
    food.draw();
    if (foodisEaten(snake, food)) eatFood();
    requestAnimationFrame(gameLoop);
  });


});
