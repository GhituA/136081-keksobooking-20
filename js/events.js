'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 84;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterElements = mapFilter.children;
  var adFormAddress = adForm.querySelector('[name="address"]');

  var toggleFormElements = function (elements, active) {
    for (var i = 0; i < elements.length; i++) {
      if (active === false) {
        elements[i].disabled = true;
      } else {
        elements[i].disabled = false;
      }
    }
    // elements.forEach(function (element) { <!-- не понимаю почему не работает -->
    //   if (active === false) {
    //     element.disabled = true;
    //   } else {
    //     element.disabled = false;
    //   }
    // })
  };

  var getCoordinates = function (pinWidth, pinHeight) {
    var left = mainPin.offsetLeft;
    var top = mainPin.offsetTop;
    var coordinates = Math.round(left + pinWidth / 2) + ', ' + Math.round(top + pinHeight);
    return coordinates;
  };

  var setInactiveMode = function () {
    toggleFormElements(adFormElements, false);
    toggleFormElements(mapFilterElements, false);
    adFormAddress.value = getCoordinates(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT / 2);

  };

  var setActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    toggleFormElements(adFormElements);
    toggleFormElements(mapFilterElements);
    adFormAddress.value = getCoordinates(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_ACTIVE);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      setActiveMode();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActiveMode();
    }
  });

  setInactiveMode();
})();
