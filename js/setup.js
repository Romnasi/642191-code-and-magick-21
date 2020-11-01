'use strict';

(function () {

  var userDialog = document.querySelector(`.setup`);
  var similarListElement = userDialog.querySelector(`.setup-similar-list`);
  var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

  var numberOfWizard = 4;


  // Моки

  // Генерирует имя мага
  var getWizardName = function () {
    return window.util.getRandomElement(window.Wizard.NAMES);
  };

  var getWizardSurname = function () {
    return window.util.getRandomElement(window.Wizard.SURNAMES);
  };

  var getWizardFullName = function () {
    var nameOrder = window.util.getRandomIntInclusive(0, 1);
    return nameOrder ? getWizardName() + ` ` + getWizardSurname() : getWizardSurname() + ` ` + getWizardName();
  };

  // Генерирует цвет плаща мага
  var getCoatColor = function () {
    return window.util.getRandomElement(window.Wizard.COAT_COLOR);
  };

  // Генерирует цвет глаз мага
  var getEyesColor = function () {
    return window.util.getRandomElement(window.Wizard.EYES_COLOR);
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

  window.Wizard = {
    NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
    SURNAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
    COAT_COLOR: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
    EYES_COLOR: [`black`, `red`, `blue`, `yellow`, `green`],
    FIREBALL_COLOR: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
  };

})();
