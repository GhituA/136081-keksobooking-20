'use strict';

(function () {

  var renderCard = window.card.render;
  var onEscPress = window.card.onEscPress;
  var shuffleArray = window.util.shuffleArray;

  var onPinClick = function (element, input) {
    var activePin = document.querySelector('.map__pin--active');
    var mapCard = document.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
      activePin.classList.remove('map__pin--active');
    }

    element.classList.add('map__pin--active');
    renderCard(input);
    document.addEventListener('keydown', onEscPress);
  };

  var getPinElement = function (input) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = input.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = input.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = input.author.avatar;
    pinElement.querySelector('img').alt = input.offer.title;

    pinElement.addEventListener('click', function () {
      onPinClick(pinElement, input);
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.enterKey) {
        onPinClick(pinElement, input);
      }
    });

    return pinElement;
  };

  var removePins = function () {
    var map = document.querySelector('.map');
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (mapPin) {
      mapPin.remove();
    });
  };

  var checkElementsOffer = function (element) {
    return element.offer;
  };

  var renderPins = function (elements) {
    var pinList = document.querySelector('.map__pins');
    var pinFragment = document.createDocumentFragment();


    var checkedOffers = elements.filter(checkElementsOffer);
    var shuffledElements = shuffleArray(checkedOffers);
    shuffledElements = shuffledElements.slice(0, window.util.offersMaxNumber);

    shuffledElements.forEach(function (element) {
      pinFragment.appendChild(getPinElement(element));
    });
    pinList.appendChild(pinFragment);
  };

  window.pin = {
    render: renderPins,
    remove: removePins
  };

})();
