'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;
  var MAIN_PIN_INACTIVE_X = 570;
  var MAIN_PIN_INACTIVE_Y = 375;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var mainPin = map.querySelector('.map__pin--main');

  var onLoad = window.load.load;
  var renderPins = window.pin.render;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;
  var onLoadError = window.load.onError;
  var onMainPinDrag = window.mainPin.drag;
  var setMainPinCoordinates = window.mainPin.setMainPinCoordinates;
  var setFilterInactive = window.filter.deactivate;
  var setFilterActive = window.filter.activate;
  var toggleArrayElements = window.util.toggleArrayElements;

  var onLoadSuccess = function (elements) {
    renderPins(elements);
    setFilterActive(elements);
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

  var resetMainPinLocation = function () {
    mainPin.style.left = MAIN_PIN_INACTIVE_X + 'px';
    mainPin.style.top = MAIN_PIN_INACTIVE_Y + 'px';
  };


  var addClassToElement = function (element, className) {
    element.classList.add(className);
  };


  var setInactiveMode = function () {
    addClassToElement(adForm, 'ad-form--disabled');
    addClassToElement(map, 'map--faded');

    toggleArrayElements(adFormElements);
    setFilterInactive();
    resetMainPinLocation();
    setMainPinCoordinates(MAIN_PIN_HEIGHT / 2);
    removePins();
    removeCard();

    mainPin.addEventListener('mousedown', onMainPinMouseDown);
    mainPin.addEventListener('keydown', onMainPinKeyDown);
  };

  var setActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    toggleArrayElements(adFormElements, true);
    setFilterActive();
    setMainPinCoordinates(MAIN_PIN_HEIGHT_ACTIVE);
    onLoad(onLoadSuccess, onLoadError);

    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainPin.removeEventListener('keydown', onMainPinKeyDown);
    mainPin.addEventListener('mousedown', onMainPinDrag);
  };

  setInactiveMode();

  window.events = {
    setInactiveMode: setInactiveMode,
    toggleArrayElements: toggleArrayElements
  };

})();
