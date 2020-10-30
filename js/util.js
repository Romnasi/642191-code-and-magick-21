'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent(evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent(evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
    },
    getRandomElement(elements) {
      return elements[window.util.getRandomIntInclusive(0, elements.length - 1)];
    },
    getMaxElement(elements) {
      var maxElement = elements[0];

      for (var i = 1; i < elements.length; i++) {
        maxElement = Math.max(maxElement, elements[i]);
      }

      return maxElement;
    }
  };

})();
