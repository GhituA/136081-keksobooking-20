'use strict';

(function () {

  var NUMBER_OF_OFFERS = 5;
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
    var mainPinElement = pinElement.classList.contains('map__pin--main');

    pinElement.style.left = input.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = input.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = input.author.avatar;
    pinElement.querySelector('img').alt = input.offer.title;

    if (!mainPinElement) {
      pinElement.addEventListener('click', function () {
        onPinClick(pinElement, input);
      });

      pinElement.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          onPinClick(pinElement, input);
        }
      });
    }

    return pinElement;
  };

  var removePins = function () {
    var map = document.querySelector('.map');
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (mapPin) {
      mapPin.remove();
    });
  };


  var renderPins = function (elements) {
    var pinList = document.querySelector('.map__pins');
    var pinFragment = document.createDocumentFragment();

    var shuffledElements = shuffleArray(elements);
    shuffledElements = shuffledElements.slice(0, NUMBER_OF_OFFERS);

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
