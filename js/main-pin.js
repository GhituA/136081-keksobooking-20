'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;
  var PIN_LOCATIONY_MIN = 130;
  var PIN_LOCATIONY_MAX = 630;

  var mainPin = document.querySelector('.map__pin--main');
  var mapWidth = document.querySelector('.map').clientWidth;
  var adForm = document.querySelector('.ad-form');

  var getCoordinates = function (pinWidth, pinHeight, left, top) {
    var coordinates = Math.round(left + pinWidth / 2) + ', ' + Math.round(top + pinHeight);
    return coordinates;
  };

  var setMainPinCoordinates = function (pinHeight) {
    var adFormAddress = adForm.querySelector('#address');
    adFormAddress.readOnly = true;
    adFormAddress.value = getCoordinates(MAIN_PIN_WIDTH, pinHeight, mainPin.offsetLeft, mainPin.offsetTop);
  };

  var onMainPinDrag = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y >= PIN_LOCATIONY_MIN - MAIN_PIN_HEIGHT_ACTIVE && mainPin.offsetTop - shift.y <= PIN_LOCATIONY_MAX - MAIN_PIN_HEIGHT_ACTIVE && mainPin.offsetLeft - shift.x >= 0 - Math.ceil(MAIN_PIN_WIDTH / 2) && mainPin.offsetLeft - shift.x < mapWidth - Math.floor(MAIN_PIN_WIDTH / 2)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      setMainPinCoordinates(MAIN_PIN_HEIGHT_ACTIVE);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.mainPin = {
    drag: onMainPinDrag,
    getCoordinates: getCoordinates,
    setCoordinates: setMainPinCoordinates,
  };

})();
