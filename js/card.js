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

  var defineArray = function (arrayInput, arrayMap) {
    var element = [];
    arrayInput.forEach(function (arrayElement) {
      element.push(arrayMap[arrayElement]);
    });
    return element.join(', ');
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

  var defineCapacity = function (rooms, guests) {
    var DEFINED_ROOMS = ['комната', 'комнаты', 'комнат'];
    var DEFINED_GUESTS = ['гостя', 'гостей'];

    if (!rooms || !guests) {
      return false;
    }
    var capacity = rooms + ' ' + defineRooms(rooms, DEFINED_ROOMS) + ' для ' + guests + ' ' + defineGuests(guests, DEFINED_GUESTS);
    return capacity;
  };

  var defineTimes = function (checkin, checkout) {
    if (checkin === '0:00' || checkout === '0:00') {
      return false;
    }
    var times = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    return times;
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

  var setContent = function (className, input, parentElement, attribute) {
    var element = parentElement.querySelector(className);
    if (!input) {
      element.remove();
    }
    element[attribute] = input;
  };

  var renderPhotos = function (photosBlock, photosElement, inputPhotos) {
    if (inputPhotos.length === 0) {
      photosBlock.remove();
    }
    photosBlock.innerHTML = '';
    var cardPhotofragment = document.createDocumentFragment();

    inputPhotos.forEach(function (inputPhoto) {
      var photoElement = photosElement.cloneNode(true);

      photoElement.src = inputPhoto;
      cardPhotofragment.appendChild(photoElement);
    });
    photosBlock.appendChild(cardPhotofragment);
  };

  var getCardElement = function (input) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var cardImage = cardElement.querySelector('.popup__photo');
    var closeCard = cardElement.querySelector('.popup__close');

    setContent('.popup__title', input.offer.title, cardElement, 'textContent');
    setContent('.popup__text--address', input.offer.address, cardElement, 'textContent');
    setContent('.popup__text--price', input.offer.price + ' ₽/ночь', cardElement, 'textContent');
    setContent('.popup__type', OFFER_TYPES_MAP[input.offer.type], cardElement, 'textContent');
    setContent('.popup__text--capacity', defineCapacity(input.offer.rooms, input.offer.guests), cardElement, 'textContent');
    setContent('.popup__text--time', defineTimes(input.offer.checkin, input.offer.checkout), cardElement, 'textContent');
    setContent('.popup__features', defineArray(input.offer.features, OFFER_FEATURES_MAP), cardElement, 'textContent');
    setContent('.popup__description', input.offer.description, cardElement, 'textContent');
    setContent('.popup__avatar', input.author.avatar, cardElement, 'src');
    setContent('.popup__avatar', input.offer.title, cardElement, 'alt');
    renderPhotos(cardPhotos, cardImage, input.offer.photos);

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
