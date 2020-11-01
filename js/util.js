'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  };

  var getRandomElement = function (elements) {
    return elements[window.util.getRandomIntInclusive(0, elements.length - 1)];
  };

  var getMaxElement = function (elements) {
    var maxElement = elements[0];

    for (var i = 1; i < elements.length; i++) {
      maxElement = Math.max(maxElement, elements[i]);
    }

    return maxElement;
  };

  window.util = {
    isEscEvent,
    isEnterEvent,
    getRandomIntInclusive,
    getRandomElement,
    getMaxElement
  };

})();
