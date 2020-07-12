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
  var adFormAddress = adForm.querySelector('#address');
  var renderPins = window.pin.render;
  var offers = window.data.offers;

  var toggleFormElements = function (elements, active) {
    Array.from(elements).forEach(function (element) {
      element.disabled = !active;
    });
  };

  var getCoordinates = function (pinWidth, pinHeight) {
    var left = mainPin.offsetLeft;
    var top = mainPin.offsetTop;
    var coordinates = Math.round(left + pinWidth / 2) + ', ' + Math.round(top + pinHeight);
    return coordinates;
  };

  var setInactiveMode = function () {
    toggleFormElements(adFormElements);
    toggleFormElements(mapFilterElements);
    adFormAddress.readOnly = true;
    adFormAddress.value = getCoordinates(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT / 2);
  };

  var setActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    toggleFormElements(adFormElements, true);
    toggleFormElements(mapFilterElements, true);
    adFormAddress.value = getCoordinates(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_ACTIVE);
    renderPins(offers);

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
