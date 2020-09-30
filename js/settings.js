'use strict';

var Speed = {
  LEFT: 2,
  RIGHT: 5
};

var Proportion = {
  WIZARD_HEIGHT: 1.337,
  Y: 3,
  X: 2
};

window.fireballSize = 22;
window.wizardWidth = 70;
window.wizardSpeed = 3;

window.getFireballSpeed = function (isMovingLeft) {
  return isMovingLeft ? Speed.LEFT : Speed.RIGHT;
};

window.getWizardHeight = function () {
  return window.wizardWidth * Proportion.WIZARD_HEIGHT;
};

window.getWizardX = function (gameFieldWidth) {
  return (gameFieldWidth - window.wizardWidth) / Proportion.X;
};

window.getWizardY = function (gameFieldHeight) {
  return gameFieldHeight / Proportion.Y;
};
