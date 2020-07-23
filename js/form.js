'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMG_DEFAULT_PREVIEW = 'img/muffin-grey.svg';

  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelects = adForm.querySelectorAll('select');

  var avatarField = adForm.querySelector('#avatar');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var titleField = adForm.querySelector('#title');
  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');
  var checkInField = adForm.querySelector('#timein');
  var checkOutField = adForm.querySelector('#timeout');
  var roomField = adForm.querySelector('#room_number');
  var capacityField = adForm.querySelector('#capacity');
  var imagesField = adForm.querySelector('#images');
  var imagePreview = adForm.querySelector('.ad-form__photo');

  var toggleArrayElements = window.util.toggleArrayElements;
  var addClassToElement = window.util.addClassToElement;
  var removeClassFromElement = window.util.removeClassFromElement;

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

  var setRedBorder = function (formElement) {
    formElement.style.border = '2px solid #ff5635';
  };

  var removeBorder = function (formElement) {
    formElement.style.border = 'none';
  };

  var clearErrors = function (elements) {
    Array.from(elements).forEach(function (element) {
      element.style.border = 'none';
    });
  };

  var onRoomCapacityChange = function () {
    var guests = capacityField.value;
    var rooms = roomField.value;

    if (!capacityMap[rooms].guests.includes(guests)) {
      roomField.setCustomValidity(capacityMap[rooms].message);
      setRedBorder(roomField);
    } else {
      roomField.setCustomValidity('');
      removeBorder(roomField);
    }
  };

  var onPriceChange = function () {
    var typeValue = typeField.value;
    priceField.placeholder = typeMap[typeValue];
    priceField.min = typeMap[typeValue];

    if (priceField.value < typeMap[typeValue]) {
      priceField.setCustomValidity('Минимальная цена выбранного типа жилья: ' + typeMap[typeValue] + ' за ночь');
      setRedBorder(priceField);
    } else if (priceField.value > MAX_PRICE) {
      priceField.setCustomValidity('Максимальная цена выбранного типа жилья: 1 000 000 руб. за ночь');
      setRedBorder(priceField);
    } else {
      priceField.setCustomValidity('');
      removeBorder(priceField);
    }
  };

  var onCheckInChange = function (evt) {
    checkOutField.value = evt.target.value;
  };

  var onCheckOutChange = function (evt) {
    checkInField.value = evt.target.value;
  };

  var resetImagePreviews = function () {
    imagePreview.removeAttribute('style');

    avatarPreview.src = IMG_DEFAULT_PREVIEW;
  };

  var getAvatarPreview = function (value) {
    avatarPreview.src = value;
  };

  var getPhotoPreview = function (value) {
    imagePreview.style.backgroundImage = 'url(' + value + ')';
    imagePreview.style.backgroundSize = 'cover';
  };

  var setImagePreview = function (inputField, cb) {
    var file = inputField.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var imgReader = new FileReader();

      imgReader.addEventListener('load', function () {
        cb(imgReader.result);
      });

      imgReader.readAsDataURL(file);
    }
  };

  var onAvatarInput = function () {
    setImagePreview(avatarField, getAvatarPreview);
  };

  var onPhotosInput = function () {
    setImagePreview(imagesField, getPhotoPreview);
  };

  var onTitleInput = function (evt) {
    var valueLength = evt.target.value.length;
    if (valueLength === 0) {
      evt.target.setCustomValidity('Это поле обязательно для заполнения');
      setRedBorder(evt.target);
    } else if (valueLength < MIN_TITLE_LENGTH) {
      evt.target.setCustomValidity('Минимальная длина заголовка: 30 символов. Введите ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
      setRedBorder(evt.target);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      evt.target.setCustomValidity('Минимальная длина заголовка: 100 символов. Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
      setRedBorder(evt.target);
    } else {
      evt.target.setCustomValidity('');
      removeBorder(evt.target);
    }
  };

  var onRoomsChange = function (evt) {
    var rooms = evt.target.value;
    for (var j = 0; j < capacityField.options.length; j++) {
      capacityField.options[j].disabled = !capacityMap[rooms].guests.includes(capacityField.options[j].value);
    }
    onRoomCapacityChange();
  };

  var setFormActive = function () {
    removeClassFromElement(adForm, 'ad-form--disabled');
    toggleArrayElements(adFormElements, true);

    avatarField.addEventListener('change', onAvatarInput);
    titleField.addEventListener('input', onTitleInput);
    typeField.addEventListener('change', onPriceChange);
    priceField.addEventListener('change', onPriceChange);
    checkInField.addEventListener('change', onCheckInChange);
    checkOutField.addEventListener('change', onCheckOutChange);
    roomField.addEventListener('change', onRoomsChange);
    capacityField.addEventListener('change', onRoomCapacityChange);
    imagesField.addEventListener('change', onPhotosInput);
  };

  var setFromInactive = function () {
    clearErrors(adFormInputs);
    clearErrors(adFormSelects);

    addClassToElement(adForm, 'ad-form--disabled');
    toggleArrayElements(adFormElements);

    avatarField.removeEventListener('change', onAvatarInput);
    titleField.removeEventListener('input', onTitleInput);
    typeField.removeEventListener('change', onPriceChange);
    priceField.removeEventListener('change', onPriceChange);
    checkInField.removeEventListener('change', onCheckInChange);
    checkOutField.removeEventListener('change', onCheckOutChange);
    roomField.removeEventListener('change', onRoomsChange);
    capacityField.removeEventListener('change', onRoomCapacityChange);
    imagesField.removeEventListener('change', onPhotosInput);
  };

  window.form = {
    activate: setFormActive,
    deactivate: setFromInactive,
    resetImagePreviews: resetImagePreviews
  };

})();
