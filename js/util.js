'use strict';

(function () {

  var EVT_KEY_ESCAPE = 'Escape';
  var EVT_KEY_ENTER = 'Enter';
  var EVT_BUTTON_LEFT = 0;
  var MAX_NUMBER_OF_OFFERS = 5;
  var PIN_LOCATIONY_MIN = 130;
  var PIN_LOCATIONY_MAX = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;

  var MessageMap = {
    SUCCESS: 'success',
    ERROR: 'error'
  };

  var shuffleArray = function (elements) {
    var j;
    var temp;
    var randomElements = elements.slice();
    for (var i = randomElements.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = randomElements[i];
      randomElements[i] = randomElements[j];
      randomElements[j] = temp;
    }
    return randomElements;
  };

  var toggleArrayElements = function (elements, active) {
    Array.from(elements).forEach(function (element) {
      element.disabled = !active;
    });
  };

  var addClassToElement = function (element, className) {
    element.classList.add(className);
  };

  var removeClassFromElement = function (element, className) {
    element.classList.remove(className);
  };

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.round(Math.random() * (max - min) + min);
    return randomNumber;
  };

  var getRandomElement = function (elements) {
    var randomElement = elements[Math.floor(Math.random() * elements.length)];
    return randomElement;
  };

  window.util = {
    shuffleArray: shuffleArray,
    toggleArrayElements: toggleArrayElements,
    addClassToElement: addClassToElement,
    removeClassFromElement: removeClassFromElement,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    escKey: EVT_KEY_ESCAPE,
    enterKey: EVT_KEY_ENTER,
    mouseLeft: EVT_BUTTON_LEFT,
    offersMaxNumber: MAX_NUMBER_OF_OFFERS,
    pinLocationYMin: PIN_LOCATIONY_MIN,
    pinLocationYMax: PIN_LOCATIONY_MAX,
    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT,
    mainPinHeightActive: MAIN_PIN_HEIGHT_ACTIVE,
    messageError: MessageMap.ERROR,
    messageSuccess: MessageMap.SUCCESS
  };

})();
