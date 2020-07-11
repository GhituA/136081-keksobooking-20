'use strict';

(function () {

  var offers = [];
  var OFFER_NUMBER = 8;
  var OFFER_PRICE_MAX = 1000000;
  var OFFER_ROOMS_MAX = 100;
  var OFFER_GUESTS_MAX = 3;
  var PIN_LOCATIONY_MIN = 130;
  var PIN_LOCATIONY_MAX = 630;

  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var renderCard = window.card.render;

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.round(Math.random() * (max - min) + min);
    return randomNumber;
  };

  var getRandomElement = function (elements) {
    var randomElement = elements[Math.floor(Math.random() * elements.length)];
    return randomElement;
  };

  for (var i = 0; i < OFFER_NUMBER; i++) {
    var mapWidth = document.querySelector('.map').clientWidth;
    var pinLocationX = getRandomNumber(1, mapWidth);
    var pinLocationY = getRandomNumber(PIN_LOCATIONY_MIN, PIN_LOCATIONY_MAX);

    offers.push({
      author: {
        avatarUrl: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'Заголовок предложения' + ' ' + (i + 1),
        address: pinLocationX + ', ' + pinLocationY,
        price: getRandomNumber(1, OFFER_PRICE_MAX),
        type: getRandomElement(OFFER_TYPES),
        rooms: getRandomNumber(1, OFFER_ROOMS_MAX),
        guests: getRandomNumber(1, OFFER_GUESTS_MAX),
        checkin: getRandomElement(OFFER_CHECKIN),
        checkout: getRandomElement(OFFER_CHECKOUT),
        features: OFFER_FEATURES.slice(0, getRandomNumber(0, OFFER_FEATURES.length - 1)),
        description: 'Описание предложения' + ' ' + (i + 1),
        photos: OFFER_PHOTOS.slice(0, getRandomNumber(0, OFFER_FEATURES.length - 1))
      },
      location: {
        x: pinLocationX,
        y: pinLocationY
      }
    });
  }

  var openCard = function (element, input) {
    var activePin = document.querySelector('.map__pin--active');
    var mapCard = document.querySelector('.map__card');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    } else if (mapCard) {
      mapCard.remove();
    }
    element.classList.add('map__pin--active');
    renderCard(input);
  };

  var getPinElement = function (input) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = input.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = input.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = input.author.avatarUrl;
    pinElement.querySelector('img').alt = input.offer.title;

    pinElement.addEventListener('click', function () {
      openCard(pinElement, input);
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        openCard(pinElement, input);
      }
    });

    return pinElement;
  };

  var renderPins = function (elements) {
    var pinList = document.querySelector('.map__pins');
    var pinFragment = document.createDocumentFragment();

    elements.forEach(function (element) {
      pinFragment.appendChild(getPinElement(element));
    });
    pinList.appendChild(pinFragment);
  };

  window.pin = {
    offers: offers,
    render: renderPins
  };

})();
