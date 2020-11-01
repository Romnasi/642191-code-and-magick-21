// dialog.js
'use strict';
(function () {

  var InputNameLength = {
    MIN: 2,
    MAX: 25
  };

  var DefaultCoordDialog = {
    X: `50%`,
    Y: `80px`
  };

  var setupOpen = document.querySelector(`.setup-open`);
  var setupClose = document.querySelector(`.setup-close`);
  var userDialog = document.querySelector(`.setup`);

  // Маг и его вещи в окне настройки персонажа
  var setupPlayer = document.querySelector(`.setup-player`);
  var wizardCoat = setupPlayer.querySelector(`.wizard-coat`);
  var wizardEyes = setupPlayer.querySelector(`.wizard-eyes`);
  var setupFireball = setupPlayer.querySelector(`.setup-fireball-wrap`);

  var userNameInput = userDialog.querySelector(`.setup-user-name`);


  // Взаимодействие с окном настройки персонажа
  // Обработчик Закрытия по Escape
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };


  // ОБработчик Закрытия по клику
  var onButtonCloseClick = function () {
    closePopup();
  };


  // ОБработчик Закрытия по нажатию Enter
  var onButtonClosePress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };


  // Записывает данные в скрытые поля
  var writeToHiddenInput = function (color, inputName) {
    var hiddenInput = document.querySelector(`input[name=${inputName}]`);
    hiddenInput.value = color;
  };


  // Меняет цвет элемента на рандомный
  var colorize = function (element, setColor, writeToStyle, inputName) {
    var color = window.util.getRandomElement(setColor);
    element.style[writeToStyle] = color;
    writeToHiddenInput(color, inputName);
  };


  var onCoatClick = function () {
    colorize(wizardCoat, window.Wizard.COAT_COLOR, `fill`, `coat-color`);
  };

  var onEyesClick = function () {
    colorize(wizardEyes, window.Wizard.EYES_COLOR, `fill`, `eyes-color`);
  };

  var onFireballClick = function () {
    colorize(setupFireball, window.Wizard.FIREBALL_COLOR, `backgroundColor`, `fireball-color`);
  };


  var openPopup = function () {
    userDialog.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
    setupClose.addEventListener(`click`, onButtonCloseClick);
    setupClose.addEventListener(`keydown`, onButtonClosePress);

    // Обработчики на изменение внешнего вида персонажа
    wizardCoat.addEventListener(`click`, onCoatClick);
    wizardEyes.addEventListener(`click`, onEyesClick);
    setupFireball.addEventListener(`click`, onFireballClick);
  };


  var closePopup = function () {
    userDialog.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
    setupClose.removeEventListener(`keydown`, onButtonCloseClick);
    setupClose.removeEventListener(`keydown`, onButtonClosePress);

    // Обработчики на изменение внешнего вида персонажа
    wizardCoat.removeEventListener(`click`, onCoatClick);
    wizardEyes.removeEventListener(`click`, onEyesClick);
    setupFireball.removeEventListener(`click`, onFireballClick);

    window.userDialog.style.top = `${DefaultCoordDialog.Y}`;
    window.userDialog.style.left = `${DefaultCoordDialog.X}`;
  };


  // Обработчик открытия настройки по клику на аватар
  var onSetupOpenClick = function () {
    openPopup();
  };

  // Обработчик открытия настройки по нажатию Enter
  var onSetupOpenPress = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };

  setupOpen.addEventListener(`click`, onSetupOpenClick);
  setupOpen.addEventListener(`keydown`, onSetupOpenPress);


  // Валидация  поля имени окне настройки персонажа
  userNameInput.addEventListener(`input`, function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < InputNameLength.MIN) {
      userNameInput.setCustomValidity(`Еще ${InputNameLength.MIN - valueLength} симв.`);
    } else if (valueLength > InputNameLength.MAX) {
      userNameInput.setCustomValidity(`Удалите лишние ${valueLength - InputNameLength.MAX} симв.`);
    } else {
      userNameInput.setCustomValidity(``);
    }

    userNameInput.reportValidity();
  });

})();
