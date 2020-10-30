// Перемещение диалога
'use strict';

(function () {

  window.userDialog = document.querySelector(`.setup`);
  var dialogHandle = document.querySelector(`.upload`);

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.userDialog.style.top = `${window.userDialog.offsetTop - shift.y}px`;
      window.userDialog.style.left = `${window.userDialog.offsetLeft - shift.x}px`;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
