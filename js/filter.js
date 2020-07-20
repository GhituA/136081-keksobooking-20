'use strict';

(function () {

  var mapFilter = document.querySelector('.map__filters');
  var mapFilterElements = mapFilter.children;

  var typeFilter = mapFilter.querySelector('#housing-type');
  // var priceFilter = mapFilter.querySelector('#housing-price');
  // var roomsFilter = mapFilter.querySelector('#housing-rooms');
  // var guestsFilter = mapFilter.querySelector('#housing-guests');
  // var featuresFilter = mapFilter.querySelectorAll('.map__checkbox');

  var toggleArrayElements = window.util.toggleArrayElements;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;
  var renderPins = window.pin.render;
  var debounce = window.debounce;

  var ads = [];

  var getAds = function (input) {
    ads = input;
  };

  var filterByType = function (type, input) {
    var filteredAds = input;
    if (type !== 'any') {
      filteredAds = input.filter(function (ad) {
        return ad.offer.type === type;
      });
    } else {
      filteredAds = input;
    }
    return filteredAds;
  };

  var onFilterChange = debounce(function () {
    var input = ads;
    var typeValue = typeFilter.value;

    var filteredType = filterByType(typeValue, input);

    removeCard();
    removePins();
    renderPins(filteredType);
  });

  var setFilterActive = function (input) {
    getAds(input);
    toggleArrayElements(mapFilterElements, true);

    mapFilter.addEventListener('change', onFilterChange);
  };

  var setFilterInactive = function () {
    mapFilter.reset();
    toggleArrayElements(mapFilterElements);

    mapFilter.removeEventListener('change', onFilterChange);
  };

  window.filter = {
    activate: setFilterActive,
    deactivate: setFilterInactive
  };


})();
