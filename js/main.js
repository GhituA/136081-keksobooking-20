'use strict';

document.querySelector('.map').classList.remove('map--faded');
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

var getRandomArray = function (elements) {
  var randomArray = [];
  for (var i = 0; i < getRandomNumber(1, elements.length); i++) {
    randomArray[i] = elements[Math.floor(Math.random() * elements.length)];
  }
  return randomArray;
};

for (var i = 0; i < 8; i++) {
  offers[i] = {
    author: {
      avatarUrl: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    },
    offer: {
      title: 'Заголовок предложения №' + getRandomNumber(1, 8),
      address: location.locationX + ',' + location.locationY, // <--- не нашла как присвоить значение другого ключа
      price: getRandomNumber(0, 1000000),
      type: getRandomElement(offerTypes),
      rooms: getRandomNumber(0, 3),
      guests: getRandomNumber(1, 3),
      checkin: getRandomElement(offerCheckins),
      checkout: getRandomElement(offerCheckins), // <--- не нашла как присвоить значение другого ключа (checkin)
      features: getRandomArray(offerFeatures),
      description: getRandomElement(offerDescriptions),
      photos: getRandomArray(offerPhotos)
    },
    location: {
      locationX: getRandomNumber(1, mapWidth),
      locationY: getRandomNumber(130, 630)
    }
  };
}

var renderPin = function (offer) {
  var element = pinTemplate.cloneNode(true);
  element.style.left = offer.location.locationX - 25 + 'px';
  element.style.top = offer.location.locationY - 70 + 'px';

  element.querySelector('img').src = offer.author.avatarUrl;
  element.querySelector('img').alt = offer.offer.title;

  return element;
};

for (var j = 0; j < offers.length; j++) {
  fragment.appendChild(renderPin(offers[j]));
}
pinList.appendChild(fragment);
