'use strict';

(function () {
  var MAIN_PIN_HEIGHT_ACTIVE = 87;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var avatarField = adForm.querySelector('#avatar');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var titleField = adForm.querySelector('#title');
  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');
  var timeinField = adForm.querySelector('#timein');
  var timeoutField = adForm.querySelector('#timeout');
  var roomField = adForm.querySelector('#room_number');
  var capacityField = adForm.querySelector('#capacity');
  var imagesField = adForm.querySelector('#images');

  var onUpload = window.load.upload;
  var renderMessage = window.message.render;
  var setInactiveMode = window.events.setInactiveMode;
  var setMainPinCoordinates = window.mainPin.setMainPinCoordinates;

  var capacityMap = {
    '1': {
      guests: ['1'],
      message: 'В 1 комнату можно поселить только 1 гостя'
    },
    '2': {
      guests: ['1', '2'],
      message: 'В 2 комнаты можно поселить максимум 2 гостей'
    },
    '3': {
      guests: ['1', '2', '3'],
      message: 'В 3 комнаты можно поселить максимум 3 гостей'
    },
    '100': {
      guests: ['0'],
      message: 'В 100 комнат нельзя заселять гостей'
    }
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

    if (!capacityMap[rooms].guests.includes(guests)) {
      roomField.setCustomValidity(capacityMap[rooms].message);
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

  var onFormReset = function () {
    adForm.reset();
    setInactiveMode();
    setMainPinCoordinates(MAIN_PIN_HEIGHT_ACTIVE);
  };

  var onSubmitSuccess = function () {
    renderMessage(messageMap.success);
    onFormReset();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    onUpload(new FormData(adForm), onSubmitSuccess, renderMessage.bind(renderMessage, messageMap.error));
  };

  var onFileChange = function (inputField, previewField) {
    var file = inputField.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var imgReader = new FileReader();

      imgReader.addEventListener('load', function () {
        previewField.src = imgReader.result;
      });

      imgReader.readAsDataURL(file);
    }
  };

  var renderImage = function () {
    var imagePreview = adForm.querySelector('.ad-form__photo');
    var image = document.createElement('img');
    image.className = 'ad-form__photo--preview';
    image.style.width = '70px';
    image.style.height = '70px';

    onFileChange(imagesField, image);

    imagePreview.appendChild(image);
  };

  avatarField.addEventListener('change', onFileChange.bind(onFileChange, avatarField, avatarPreview));

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
  });

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

  roomField.addEventListener('change', function (evt) {
    var rooms = evt.target.value;
    for (var j = 0; j < capacityField.options.length; j++) {
      capacityField.options[j].disabled = !capacityMap[rooms].guests.includes(capacityField.options[j].value);
    }
    checkCapacityValidity();
  });

  capacityField.addEventListener('change', function () {
    checkCapacityValidity();
  });

  imagesField.addEventListener('change', renderImage);

  resetButton.addEventListener('click', onFormReset);
  resetButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onFormReset();
    }
  });

  adForm.addEventListener('submit', onFormSubmit);

})();
