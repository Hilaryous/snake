export const Key = {
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
  }

}

