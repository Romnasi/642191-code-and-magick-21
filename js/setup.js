'use strict';

var Wizard = {
  NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  SURNAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLOR: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLOR: [`black`, `red`, `blue`, `yellow`, `green`]
};

var InputNameLength = {
  MIN: 2,
  MAX: 25
};

var setupOpen = document.querySelector(`.setup-open`);
var setupClose = document.querySelector(`.setup-close`);

var userDialog = document.querySelector(`.setup`);
var userNameInput = userDialog.querySelector(`.setup-user-name`);


var similarListElement = userDialog.querySelector(`.setup-similar-list`);
var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

var numberOfWizard = 4;


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


// Взаимодействие с окном настройки персонажа

// ОБработчик Закрытия по Escape
var onPopupEscPress = function (evt) {
  if (evt.target.tagName !== `INPUT`) {

    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  }
};


// ОБработчик Закрытия по клику
var onButtonCloseClick = function () {
  closePopup();
};


// ОБработчик Закрытия по нажатию Enter
var onButtonClosePress = function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
};


var openPopup = function () {
  userDialog.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
  setupClose.addEventListener(`click`, onButtonCloseClick);
  setupClose.addEventListener(`keydown`, onButtonClosePress);
};


var closePopup = function () {
  userDialog.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  setupClose.removeEventListener(`keydown`, onButtonCloseClick);
  setupClose.removeEventListener(`keydown`, onButtonClosePress);
};


// Обработчик открытия настройки по клику на аватар
setupOpen.addEventListener(`click`, function () {
  openPopup();
});

// Обработчик открытия настройки по нажатию Enter
setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});


// Моки
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

var getRandomElement = function (elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

// Генерирует имя мага
var getWizardName = function () {
  return getRandomElement(Wizard.NAMES);
};

var getWizardSurname = function () {
  return getRandomElement(Wizard.SURNAMES);
};

var getWizardFullName = function () {
  var nameOrder = getRandomIntInclusive(0, 1);
  return nameOrder ? getWizardName() + ` ` + getWizardSurname() : getWizardSurname() + ` ` + getWizardName();
};

// Генерирует цвет плаща мага
var getCoatColor = function () {
  return getRandomElement(Wizard.COAT_COLOR);
};

// Генерирует цвет глаз мага
var getEyesColor = function () {
  return getRandomElement(Wizard.EYES_COLOR);
};

// Генерирует массив с данными магов
var getWizards = function () {
  var currentWizards = [];

  for (var i = 0; i < numberOfWizard; i++) {
    var wizardData = {
      name: getWizardFullName(),
      coatColor: getCoatColor(),
      eyesColor: getEyesColor()
    };
    currentWizards.push(wizardData);
  }
  return currentWizards;
};

var wizards = getWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizardsData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsData.length; i++) {
    fragment.appendChild(renderWizard(wizardsData[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizards(wizards);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
