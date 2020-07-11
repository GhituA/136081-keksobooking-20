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

  var DEFINED_ROOMS = ['комната', 'комнаты', 'комнат'];
  var DEFINED_GUESTS = ['гостя', 'гостей'];

  var defineArray = function (arrayInput, arrayMap) {
    var element = [];
    arrayInput.forEach(function (arrayElement) {
      element.push(arrayMap[arrayElement]);
    });
    return element;
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

  var renderPhotos = function (photosBlock, cardImg, inputPhotos) {
    photosBlock.innerHTML = '';
    var cardPhotofragment = document.createDocumentFragment();

    inputPhotos.forEach(function (inputPhoto) {
      var photoElement = cardImg.cloneNode(true);

      photoElement.src = inputPhoto;
      cardPhotofragment.appendChild(photoElement);
    });
    photosBlock.appendChild(cardPhotofragment);
  };

  var onCardClose = function () {
    var mapCard = document.querySelector('.map__card');
    var activePin = document.querySelector('.map__pin--active');
    mapCard.remove();
    activePin.classList.remove('map__pin--active');
  };

  var getCardElement = function (input) {
    var map = document.querySelector('.map');
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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
    var closeCard = cardElement.querySelector('.popup__close');

    cardTitle.textContent = input.offer.title;
    cardAvatar.src = input.author.avatarUrl;
    cardAvatar.alt = input.offer.title;
    cardAdress.textContent = input.offer.address;
    cardPrice.textContent = input.offer.price + ' ₽/ночь';
    cardType.textContent = OFFER_TYPES_MAP[input.offer.type];
    cardCapacity.textContent = input.offer.rooms + ' ' + defineRooms(input.offer.rooms, DEFINED_ROOMS) + ' для ' + input.offer.guests + ' ' + defineGuests(input.offer.guests, DEFINED_GUESTS);
    cardTime.textContent = 'Заезд после ' + input.offer.checkin + ', выезд до ' + input.offer.checkout;
    cardFeatures.textContent = defineArray(input.offer.features, OFFER_FEATURES_MAP);
    cardDescription.textContent = input.offer.description;
    cardPhotos = renderPhotos(cardPhotos, cardImg, input.offer.photos);

    map.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        onCardClose();
      }
    });

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
    render: renderCard
  };

})();
