'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;
  var MAIN_PIN_INACTIVE_X = 570;
  var MAIN_PIN_INACTIVE_Y = 375;

  var MessageMap = {
    success: 'success',
    error: 'error'
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var onLoad = window.load.load;
  var onUpload = window.load.upload;
  var renderMessage = window.message.render;
  var renderPins = window.pin.render;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;
  var onLoadError = window.load.onError;
  var onMainPinDrag = window.mainPin.drag;
  var setMainPinCoordinates = window.mainPin.setCoordinates;
  var setFilterInactive = window.filter.deactivate;
  var setFilterActive = window.filter.activate;
  var addClassToElement = window.util.addClassToElement;
  var removeClassFromElement = window.util.removeClassFromElement;
  var setFormActive = window.form.activate;
  var setFromInactive = window.form.deactivate;
  var resetImagePreviews = window.form.resetImagePreviews;

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

  var onFormReset = function () {
    adForm.reset();
    resetImagePreviews();
    setInactiveMode();
    setMainPinCoordinates(MAIN_PIN_HEIGHT_ACTIVE);
  };

  var onSubmitSuccess = function () {
    renderMessage(MessageMap.success);
    onFormReset();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    onUpload(new FormData(adForm), onSubmitSuccess, renderMessage.bind(renderMessage, MessageMap.error));
  };

  var setInactiveMode = function () {
    addClassToElement(map, 'map--faded');
    setFilterInactive();
    resetMainPinLocation();
    setMainPinCoordinates(MAIN_PIN_HEIGHT / 2);
    removePins();
    removeCard();
    setFromInactive();

    mainPin.addEventListener('mousedown', onMainPinMouseDown);
    mainPin.addEventListener('keydown', onMainPinKeyDown);
    resetButton.removeEventListener('click', onFormReset);
    adForm.removeEventListener('submit', onFormSubmit);
  };

  var setActiveMode = function () {
    setFormActive();
    removeClassFromElement(map, 'map--faded');

    setMainPinCoordinates(MAIN_PIN_HEIGHT_ACTIVE);
    onLoad(onLoadSuccess, onLoadError);


    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainPin.removeEventListener('keydown', onMainPinKeyDown);
    mainPin.addEventListener('mousedown', onMainPinDrag);
    resetButton.addEventListener('click', onFormReset);
    adForm.addEventListener('submit', onFormSubmit);
  };

  setInactiveMode();

  window.events = {
    setInactiveMode: setInactiveMode
  };

})();
