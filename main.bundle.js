/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	(function webpackMissingModule() { throw new Error("Cannot find module \"/tmp/testBundle.js\""); }());


/***/ },
/* 1 */
/***/ function(module, exports) {

	// $(document).ready(function() {
	//   var canvas = document.getElementById('game');
	//   var context = canvas.getContext('2d');

	//   var Key = {
	//     _pressed: {},

	//     LEFT: 37,
	//     UP: 38,
	//     RIGHT: 39,
	//     DOWN: 40,

	//     isDown: function(keyCode) {
	//       return this._pressed[keyCode];
	//     },

	//     onKeydown: function(keyCode) {
	//       return this._pressed[event.keyCode] = true;
	//     },

	//     onKeyup: function(keyCode) {
	//       delete this._pressed[event.keyCode];
	//     },

	//   };

	//   window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	//   window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

	//   var snake = new Snake(0, 0, 10);

	//   var food = new Food;

	//   function eatFood() {
	//     food = null;
	//     snake.grow();
	//     food = new Food;
	//   }

	//   var withinFive = function(num1, num2, num3, num4) {
	//     var xdiff = Math.abs(num1 - num2);
	//     var ydiff = Math.abs(num3 - num4);

	//     return (xdiff <= 5 && ydiff <= 5);
	//   }

	//   function foodisEaten(snake, food) {
	//     return withinFive(snake.x, food.x, food.y, snake.y);
	//   }

	//   requestAnimationFrame(function gameLoop() {
	//     context.clearRect(0,0, canvas.width, canvas.height);
	//     snake.draw().move(Key);
	//     food.draw();
	//     if (foodisEaten(snake, food)) eatFood();
	//     requestAnimationFrame(gameLoop);
	//   });

	// });
	"use strict";

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ]);