'use strict';

(function () {

  var OFFER_TYPES_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'palace': 'Дом',
    'house': 'Дворец'
  };
  var OFFER_FEATURES_MAP = {
    'wifi': 'WiFi',
    'dishwasher': 'Кухня',
    'parking': 'Парковка',
    'washer': 'Стиральная машинa',
    'elevator': 'Лифт',
    'conditioner': 'Кондиционер'
  };

  var DEFINED_ROOMS = ['комната', 'комнаты', 'комнат'];
  var DEFINED_GUESTS = ['гостя', 'гостей'];

  var defineArray = function (arrayInput, arrayMap) {
    var element = [];
    arrayInput.forEach(function (arrayElement) {
      element.push(arrayMap[arrayElement]);
    });
    return element;
  };

  var defineRooms = function (number, words) {
    if ((number % 100 > 4 && number % 100 < 20) || number % 10 === 0 || number % 10 >= 5) {
      return words[2];
    } else if (number % 10 < 5 && number % 10 > 1) {
      return words[1];
    } else {
      return words[0];
    }
  };

  var defineGuests = function (number, words) {
    if (number % 10 !== 1 || number % 100 === 11) {
      return words[1];
    } else {
      return words[0];
    }
  };

  var renderPhotos = function (photosBlock, cardImg, inputPhotos) {
    photosBlock.innerHTML = '';
    var cardPhotofragment = document.createDocumentFragment();

    inputPhotos.forEach(function (inputPhoto) {
      var photoElement = cardImg.cloneNode(true);

      photoElement.src = inputPhoto;
      cardPhotofragment.appendChild(photoElement);
    });
    photosBlock.appendChild(cardPhotofragment);
  };

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onCardClose();
    }
  };

  var onCardClose = function () {
    var mapCard = document.querySelector('.map__card');
    var activePin = document.querySelector('.map__pin--active');

    if (mapCard) {
      mapCard.remove();
      activePin.classList.remove('map__pin--active');
    }

    document.removeEventListener('keydown', onEscPress);
  };

  var setContext = function (className, text, parentElement) {
    var element = parentElement.querySelector(className);
    element.textContent = text;
  }

  var getCardElement = function (input) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var cardImg = cardElement.querySelector('.popup__photo');
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    var closeCard = cardElement.querySelector('.popup__close');

    setContext('.popup__title', input.offer.title, cardElement);
    setContext('.popup__text--address', input.offer.address, cardElement);
    setContext('.popup__text--price', input.offer.price + ' ₽/ночь', cardElement);
    setContext('.popup__type', OFFER_TYPES_MAP[input.offer.type], cardElement);
    setContext('.popup__text--capacity', input.offer.rooms + ' ' + defineRooms(input.offer.rooms, DEFINED_ROOMS) + ' для ' + input.offer.guests + ' ' + defineGuests(input.offer.guests, DEFINED_GUESTS), cardElement);
    setContext('.popup__text--time', 'Заезд после ' + input.offer.checkin + ', выезд до ' + input.offer.checkout, cardElement);
    setContext('.popup__features', defineArray(input.offer.features, OFFER_FEATURES_MAP), cardElement);
    setContext('.popup__description', input.offer.description, cardElement);
    cardAvatar.src = input.author.avatarUrl;
    cardAvatar.alt = input.offer.title;
    renderPhotos(cardPhotos, cardImg, input.offer.photos);

    closeCard.addEventListener('click', function () {
      onCardClose();
    });

    return cardElement;
  };

  var renderCard = function (elements) {
    var map = document.querySelector('.map');
    var cardFragment = document.createDocumentFragment();
    var mapFilter = document.querySelector('.map__filters-container');

    cardFragment.appendChild(getCardElement(elements));
    map.insertBefore(cardFragment, mapFilter);
  };

  window.card = {
    render: renderCard,
    onEscPress: onEscPress
  };

})();
