'use strict';

(function () {

  var renderCard = window.card.render;
  var onEscPress = window.card.onEscPress;

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

    document.addEventListener('keydown', onEscPress);

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
    render: renderPins
  };

})();
