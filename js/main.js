'use strict';

document.querySelector('.map').classList.remove('map--faded');
var mapWidth = document.querySelector('.map').clientWidth;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var offers = [];

var getRandomNumber = function (min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);
  return randomNumber;
};

for (var i = 0; i < 8; i++) {
  offers[i] = {
    author: {
      avatarUrl: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    },
    offer: {
      title: 'Заголовок предложения №' + getRandomNumber(1, 8),
      // "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      // "price": число, стоимость
      // "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      // "rooms": число, количество комнат
      // "guests": число, количество гостей, которое можно разместить
      // "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      // "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      // "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      // "description": строка с описанием,
      // "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    location: {
      locationX: getRandomNumber(1, mapWidth) + 'px',
      locationY: getRandomNumber(130, 630) + 'px'
    }
  };
}

var renderPin = function (offer) {
  var element = pinTemplate.cloneNode(true);
  element.style.left = offer.location.locationX;
  element.style.top = offer.location.locationY;

  element.querySelector('img').src = offer.author.avatarUrl;
  element.querySelector('img').alt = offer.offer.title;

  return element;
};

for (var j = 0; j < offers.length; j++) {
  fragment.appendChild(renderPin(offers[j]));
}
pinList.appendChild(fragment);
