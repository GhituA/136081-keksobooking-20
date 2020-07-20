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

  window.util = {
    shuffleArray: shuffleArray,
    toggleArrayElements: toggleArrayElements
  };

})();
