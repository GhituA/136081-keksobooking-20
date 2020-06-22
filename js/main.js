'use strict';

document.querySelector('.map').classList.remove('map--faded');
var OFFER_NUMBER = 8;
var OFFER_PRICE_MAX = 1000000;
var OFFER_ROOMS_MAX = 3;
var OFFER_GUESTS_MAX = 3;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_LOCATIONY_MIN = 130;
var PIN_LOCATIONY_MAX = 630;
var mapWidth = document.querySelector('.map').clientWidth;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var offers = [];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckins = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerDescriptions = ['Cтрока с описанием 1', 'Cтрока с описанием 2', 'Cтрока с описанием 3', 'Cтрока с описанием 4', 'Cтрока с описанием 5', 'Cтрока с описанием 6', 'Cтрока с описанием 7', 'Cтрока с описанием 8'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var getRandomNumber = function (min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);
  return randomNumber;
};

var getRandomElement = function (elements) {
  var randomElement = elements[Math.floor(Math.random() * elements.length)];
  return randomElement;
};

for (var i = 0; i < OFFER_NUMBER; i++) {
  var locationX = getRandomNumber(1, mapWidth);
  var locationY = getRandomNumber(PIN_LOCATIONY_MIN, PIN_LOCATIONY_MAX);

  offers.push({
    author: {
      avatarUrl: 'img/avatars/user0' + getRandomNumber(1, OFFER_NUMBER) + '.png',
    },
    offer: {
      title: 'Заголовок предложения №' + getRandomNumber(1, OFFER_NUMBER),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(1, OFFER_PRICE_MAX),
      type: getRandomElement(offerTypes),
      rooms: getRandomNumber(1, OFFER_ROOMS_MAX),
      guests: getRandomNumber(1, OFFER_GUESTS_MAX),
      checkin: getRandomElement(offerCheckins),
      checkout: getRandomElement(offerCheckins),
      features: offerFeatures.slice(0, getRandomNumber(0, offerFeatures.length - 1)),
      description: getRandomElement(offerDescriptions),
      photos: offerPhotos.slice(0, getRandomNumber(0, offerFeatures.length - 1))
    },
    location: {
      x: locationX,
      y: locationY
    }
  });
}

var renderPin = function (offer) {
  var element = pinTemplate.cloneNode(true);
  element.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
  element.style.top = offer.location.y - PIN_HEIGHT + 'px';

  element.querySelector('img').src = offer.author.avatarUrl;
  element.querySelector('img').alt = offer.offer.title;

  return element;
};

for (var j = 0; j < offers.length; j++) {
  fragment.appendChild(renderPin(offers[j]));
}
pinList.appendChild(fragment);
