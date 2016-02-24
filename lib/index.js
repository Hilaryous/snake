import { Snake } from './snake';
import { Food } from './food';
import { withinFive } from './helpers';
import { Key } from './user-input-helpers';
require ('./style.scss')

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let snake = new Snake;

let food = new Food;

function eatFood() {
  food = null;
  snake.isEating = true
  food = new Food;
}

function foodisEaten(snake, food) {
  return withinFive(snake.first.x, food.x, food.y, snake.first.y);
}

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

requestAnimationFrame(function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);
  snake.draw(context).move(Key);
  food.draw(context);
  if (foodisEaten(snake, food)) eatFood();
  requestAnimationFrame(gameLoop);
});
