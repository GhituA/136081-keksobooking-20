'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;
  var MAIN_PIN_INACTIVE_X = 570;
  var MAIN_PIN_INACTIVE_Y = 375;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;

  var roomField = document.querySelector('#room_number');
  var capacityField = document.querySelector('#capacity');
  var titleField = document.querySelector('#title');
  var typeField = document.querySelector('#type');
  var priceField = document.querySelector('#price');
  var timeinField = document.querySelector('#timein');
  var timeoutField = document.querySelector('#timeout');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var onUpload = window.load.upload;
  var renderMessage = window.message.renderMessage;
  var setInactiveMode = window.events.setInactiveMode;
  var getCoordinates = window.mainPin.getCoordinates;

  var roomCapacityMap = {
    '0': 'any',
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var errorMap = {
    '1': 'В 1 комнату можно поселить только 1 гостя',
    '2': 'В 2 комнаты можно поселить максимум 2 гостей',
    '3': 'В 3 комнаты можно поселить максимум 3 гостей',
    '100': 'В 100 комнат нельзя заселять гостей'
  };
  var typeMap = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var messageMap = {
    success: 'success',
    error: 'error'
  };

  var checkCapacityValidity = function () {
    var guests = capacityField.value;
    var rooms = roomField.value;

    if (!roomCapacityMap[rooms].includes(guests)) {
      roomField.setCustomValidity(errorMap[rooms]);
    } else {
      roomField.setCustomValidity('');
    }
  };

  var checkPriceValidity = function () {
    var typeValue = typeField.value;
    priceField.placeholder = typeMap[typeValue];
    priceField.min = typeMap[typeValue];

    if (priceField.value < typeMap[typeValue]) {
      priceField.setCustomValidity('Минимальная цена выбранного типа жилья: ' + typeMap[typeValue] + ' за ночь');
    } else if (priceField.value > MAX_PRICE) {
      priceField.setCustomValidity('Максимальная цена выбранного типа жилья: 1 000 000 руб. за ночь');
    } else {
      priceField.setCustomValidity('');
    }
  };

  var resetMainPinLocation = function () {
    mainPin.style.left = MAIN_PIN_INACTIVE_X + 'px';
    mainPin.style.top = MAIN_PIN_INACTIVE_Y + 'px';
  };

  var onFormReset = function () {
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = map.querySelector('.map__card');
    var adFormAddress = adForm.querySelector('#address');

    adForm.reset();
    setInactiveMode();
    resetMainPinLocation();
    adFormAddress.value = getCoordinates(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_ACTIVE, mainPin.offsetLeft, mainPin.offsetTop);
    mapPins.forEach(function (mapPin) {
      mapPin.remove();
    });
    if (card) {
      card.remove();
    }
  };

  var addClassToElement = function (element, className) {
    element.classList.add(className);
  };

  roomField.addEventListener('change', function (evt) {
    var roomsCount = evt.target.value;
    for (var j = 0; j < capacityField.options.length; j++) {
      capacityField.options[j].disabled = !roomCapacityMap[roomsCount].includes(capacityField.options[j].value);
    }
    checkCapacityValidity();
  });

  capacityField.addEventListener('change', function () {
    checkCapacityValidity();
  });

  titleField.addEventListener('input', function (evt) {
    var valueLength = evt.target.value.length;
    if (valueLength === 0) {
      titleField.setCustomValidity('Это поле обязательно для заполнения');
    } else if (valueLength < MIN_TITLE_LENGTH) {
      titleField.setCustomValidity('Минимальная длина заголовка: 30 символов. Введите ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleField.setCustomValidity('Минимальная длина заголовка: 100 символов. Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      titleField.setCustomValidity('');
    }
  }); // add onsubmit error message //

  typeField.addEventListener('change', function () {
    checkPriceValidity();
  });

  priceField.addEventListener('change', function () {
    checkPriceValidity();
  });

  timeinField.addEventListener('change', function (evt) {
    timeoutField.value = evt.target.value;
  });

  timeoutField.addEventListener('change', function (evt) {
    timeinField.value = evt.target.value;
  });

  resetButton.addEventListener('click', onFormReset);
  resetButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onFormReset();
    }
  });

  var onSubmitSuccess = function () {
    renderMessage(messageMap.success);
    onFormReset();
    addClassToElement(adForm, 'ad-form--disabled');
    addClassToElement(map, 'map--faded');
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    onUpload(new FormData(adForm), onSubmitSuccess, renderMessage.bind(null, messageMap.error));
  };

  adForm.addEventListener('submit', onFormSubmit);

})();
