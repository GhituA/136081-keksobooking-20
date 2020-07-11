'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;

  var roomField = document.querySelector('#room_number');
  var capacityField = document.querySelector('#capacity');
  var titleField = document.querySelector('#title');
  var typeField = document.querySelector('#type');
  var priceField = document.querySelector('#price');
  var timeinField = document.querySelector('#timein');
  var timeoutField = document.querySelector('#timeout');
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

  var checkInputValidity = function (rooms, guests) {
    if (!roomCapacityMap[rooms].includes(guests)) {
      roomField.setCustomValidity(errorMap[rooms]);
    } else {
      roomField.setCustomValidity('');
    }
  };

  roomField.addEventListener('change', function (evt) {
    var roomsCount = evt.target.value;
    var guestsCount = capacityField.value;
    for (var j = 0; j < capacityField.options.length; j++) {
      capacityField.options[j].disabled = !roomCapacityMap[roomsCount].includes(capacityField.options[j].value);
    }
    checkInputValidity(roomsCount, guestsCount);
  });

  capacityField.addEventListener('change', function (evt) {
    var roomsCount = roomField.value;
    var guestsCount = evt.target.value;
    checkInputValidity(roomsCount, guestsCount);
  });

  titleField.addEventListener('input', function (evt) {
    var valueLength = evt.target.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleField.setCustomValidity('Минимальная длина заголовка: 30 символов. Введите ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleField.setCustomValidity('Минимальная длина заголовка: 100 символов. Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      titleField.setCustomValidity('');
    }
  });

  typeField.addEventListener('change', function (evt) {
    priceField.placeholder = typeMap[evt.target.value];
    priceField.min = typeMap[evt.target.value];
  });

  // --- customeValidity не работает или криво (не обновляется цена в сообщении об ошибке) --- //

  priceField.addEventListener('change', function (evt) {
    var typeValue = typeField.value;
    if (evt.target.value < typeMap[typeValue]) {
      priceField.setCustomValidity('Минимальная цена выбранного типа жилья: ' + typeMap[typeValue] + ' за ночь');
    } else if (evt.target.value > MAX_PRICE) {
      priceField.setCustomValidity('Максимальная цена выбранного типа жилья: 1 000 000 руб. за ночь');
    } else {
      priceField.setCustomValidity('');
    }
  });

  timeinField.addEventListener('change', function (evt) {
    timeoutField.value = evt.target.value;
  });

  // --- customeValidity не убирается --- //

  timeoutField.addEventListener('change', function (evt) {
    if (evt.target.value !== timeinField.value) {
      timeoutField.setCustomValidity('Время выезда должно соответствовать времени заезда');
    } else {
      priceField.setCustomValidity('');
    }
  });

})();
