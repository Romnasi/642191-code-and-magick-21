'use strict';

var Wizard = {
  NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  SURNAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLOR: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLOR: [`black`, `red`, `blue`, `yellow`, `green`]
};

var userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

var similarListElement = userDialog.querySelector(`.setup-similar-list`);
var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

var numberOfWizard = 4;

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

// Генерирует имя мага
var getWizardName = function () {
  return Wizard.NAMES[getRandomIntInclusive(0, Wizard.NAMES.length - 1)];
};

var getWizardSurname = function () {
  return Wizard.SURNAMES[getRandomIntInclusive(0, Wizard.SURNAMES.length - 1)];
};

var getWizardFullName = function () {
  var nameOrder = getRandomIntInclusive(0, 1);
  return nameOrder ? getWizardName() + ` ` + getWizardSurname() : getWizardSurname() + ` ` + getWizardName();
};

// Генерирует цвет плаща мага
var getCoatColor = function () {
  return Wizard.COAT_COLOR[getRandomIntInclusive(0, Wizard.COAT_COLOR.length - 1)];
};

// Генерирует цвет глаз мага
var getEyesColor = function () {
  return Wizard.EYES_COLOR[getRandomIntInclusive(0, Wizard.EYES_COLOR.length - 1)];
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

var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizards[i].name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizards[i].coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizards[i].eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
