'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardFragment = document.createDocumentFragment();
  var cardElement = cardTemplate.cloneNode(true);
  var cardTitle = cardElement.querySelector('.popup__title');
  var cardAdress = cardElement.querySelector('.popup__text--address');
  var cardPrice = cardElement.querySelector('.popup__text--price');
  var cardType = cardElement.querySelector('.popup__type');
  var cardCapacity = cardElement.querySelector('.popup__text--capacity');
  var cardTime = cardElement.querySelector('.popup__text--time');
  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardDescription = cardElement.querySelector('.popup__description');
  var cardPhotos = cardElement.querySelector('.popup__photos');
  var cardImg = cardElement.querySelector('.popup__photo');
  var cardAvatar = cardElement.querySelector('.popup__avatar');
  var cardPhotofragment = document.createDocumentFragment();
  var mapFilter = document.querySelector('.map__filters-container');

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

  var declineArray = function (arrayInput, arrayMap) {
    var element = [];
    arrayInput.forEach(function (arrayElement) {
      element.push(arrayMap[arrayElement]);
    });
    return element;
  };

  var declineRooms = function (number, words) {
    if ((number % 100 > 4 && number % 100 < 20) || number % 10 === 0 || number % 10 >= 5) {
      return words[2];
    } else if (number % 10 < 5 && number % 10 > 1) {
      return words[1];
    } else {
      return words[0];
    }
  };

  var declineGuests = function (number, words) {
    if (number % 10 !== 1 || number % 100 === 11) {
      return words[1];
    } else {
      return words[0];
    }
  };

  var renderPhotos = function (photos) {
    cardPhotos.innerHTML = '';
    photos.forEach(function (photo) {
      var photoElement = cardImg.cloneNode(true);
      photoElement.src = photo;
      cardPhotofragment.appendChild(photoElement);
    });
    cardPhotos.appendChild(cardPhotofragment);
  };

  var renderCard = function (input) {
    cardTitle.textContent = input.offer.title;
    cardAdress.textContent = input.offer.address;
    cardPrice.textContent = input.offer.price + ' ₽/ночь';
    cardType.textContent = OFFER_TYPES_MAP[input.offer.type];
    cardCapacity.textContent = input.offer.rooms + ' ' + declineRooms(input.offer.rooms, DEFINED_ROOMS) + ' для ' + input.offer.guests + ' ' + declineGuests(input.offer.guests, DEFINED_GUESTS);
    cardTime.textContent = 'Заезд после ' + input.offer.checkin + ', выезд до ' + input.offer.checkout;
    cardFeatures.textContent = declineArray(input.offer.features, OFFER_FEATURES_MAP);
    cardDescription.textContent = input.offer.description;
    cardPhotos = renderPhotos(input.offer.photos);
    cardAvatar.src = input.author.avatarUrl;
    cardImg.alt = input.offer.title;

    return cardElement;
  };

  cardFragment.appendChild(renderCard(window.pin.offers[0]));
  map.insertBefore(cardFragment, mapFilter);
})();
