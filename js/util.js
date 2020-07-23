'use strict';

(function () {

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
    getRandomElement: getRandomElement
  };

})();
