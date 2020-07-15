'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;

  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterElements = mapFilter.children;
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var adFormAddress = adForm.querySelector('#address');

  var onXHRload = window.load.onXHRload;
  var renderPins = window.pin.render;
  var onLoadError = window.load.onLoadError;
  var onMainPinDrag = window.mainPin.drag;
  var getCoordinates = window.mainPin.getCoordinates;

  var toggleFormElements = function (elements, active) {
    Array.from(elements).forEach(function (element) {
      element.disabled = !active;
    });
  };

  var onMainPinMouseDown = function (evt) {
    if (evt.button === 0) {
      setActiveMode();
    }
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.key === 'Enter') {
      setActiveMode();
    }
  };

  var setInactiveMode = function () {
    toggleFormElements(adFormElements);
    toggleFormElements(mapFilterElements);
    adFormAddress.readOnly = true;
    adFormAddress.value = getCoordinates(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT / 2, mainPin.offsetLeft, mainPin.offsetTop);

    mainPin.addEventListener('mousedown', onMainPinMouseDown);
    mainPin.addEventListener('keydown', onMainPinKeyDown);
  };

  var setActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    toggleFormElements(adFormElements, true);
    toggleFormElements(mapFilterElements, true);
    adFormAddress.value = getCoordinates(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_ACTIVE, mainPin.offsetLeft, mainPin.offsetTop);
    onXHRload(renderPins, onLoadError);

    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainPin.removeEventListener('keydown', onMainPinKeyDown);
    mainPin.addEventListener('mousedown', onMainPinDrag);
  };

  setInactiveMode();

})();
