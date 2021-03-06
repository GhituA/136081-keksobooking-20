'use strict';

(function () {

  var OFFER_NUMBER = 8;
  var OFFER_PRICE_MAX = 1000000;
  var OFFER_ROOMS_MAX = 100;
  var OFFER_GUESTS_MAX = 3;

  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomElement = window.util.getRandomElement;
  var getRandomNumber = window.util.getRandomNumber;

  var offers = [];

  for (var i = 0; i < OFFER_NUMBER; i++) {
    var mapWidth = document.querySelector('.map').clientWidth;
    var pinLocationX = getRandomNumber(1, mapWidth);
    var pinLocationY = getRandomNumber(window.util.pinLocationYMin, window.util.pinLocationYMax);

    offers.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'Заголовок предложения' + ' ' + (i + 1),
        address: pinLocationX + ', ' + pinLocationY,
        price: getRandomNumber(1, OFFER_PRICE_MAX),
        type: getRandomElement(OFFER_TYPES),
        rooms: getRandomNumber(1, OFFER_ROOMS_MAX),
        guests: getRandomNumber(1, OFFER_GUESTS_MAX),
        checkin: getRandomElement(OFFER_CHECKINS),
        checkout: getRandomElement(OFFER_CHECKOUTS),
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

  window.data = {
    offers: offers
  };

})();
