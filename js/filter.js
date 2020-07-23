'use strict';

(function () {

  var PRICE_MARK_LOW = 10000;
  var PRICE_MARK_MIDDLE = 50000;
  var FILTER_VALUE_DEFAULT = 'any';

  var PriceFilter = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var mapFilter = document.querySelector('.map__filters');
  var mapFilterElements = mapFilter.children;

  var typeFilter = mapFilter.querySelector('#housing-type');
  var priceFilter = mapFilter.querySelector('#housing-price');
  var roomsFilter = mapFilter.querySelector('#housing-rooms');
  var guestsFilter = mapFilter.querySelector('#housing-guests');
  var featuresFilters = mapFilter.querySelectorAll('.map__checkbox');

  var toggleArrayElements = window.util.toggleArrayElements;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;
  var renderPins = window.pin.render;
  var debounce = window.debounce;

  var defaultAds = [];

  var getDefaultAds = function (elements) {
    defaultAds = elements;
  };

  var isANumber = function (value) {
    if (isNaN(value)) {
      return value;
    } else {
      return Number(value);
    }
  };

  var getFilteredAd = function (value, data, element) {
    if (isANumber(value) === element.offer[data]) {
      var filteredAd = element;
    }
    return filteredAd;
  };

  var filterByPrice = function (value, data, element) {
    var filteredElement;
    if (value === PriceFilter.LOW && element.offer[data] < PRICE_MARK_LOW) {
      filteredElement = element;
    } else if (value === PriceFilter.MIDDLE && element.offer[data] > PRICE_MARK_LOW && element.offer.price < PRICE_MARK_MIDDLE) {
      filteredElement = element;
    } else if (value === PriceFilter.HIGH && element.offer[data] > PRICE_MARK_MIDDLE) {
      filteredElement = element;
    }
    return filteredElement;
  };

  var getCheckedFeatures = function (elements) {
    var checkedFeatures = [];
    Array.from(elements).forEach(function (element) {
      if (element.checked) {
        checkedFeatures.push(element.value);
      }
    });
    return checkedFeatures;
  };

  var filterByFeatures = function (value, data, element) {
    var filterElement = element;
    if (!value.length) {
      return element;
    } else {
      for (var i = 0; i < value.length; i++) {
        if (filterElement.offer[data].includes(value[i])) {
          filterElement = element;
        } else {
          filterElement = false;
          break;
        }
      }
    }
    return filterElement;
  };

  var getFilteredAds = function (filterFunction, value, data, elements) {
    var filteredAds = [];
    for (var i = 0; i < elements.length && filteredAds.length < window.util.offersMaxNumber; i++) {
      if (value === FILTER_VALUE_DEFAULT) {
        return elements;
      } else if (filterFunction(value, data, elements[i])) {
        filteredAds.push(elements[i]);
      }
    }
    return filteredAds;
  };

  var onFilterChange = debounce(function () {

    var typeFilterValue = typeFilter.value;
    var priceFilterValue = priceFilter.value;
    var roomsFilterValue = roomsFilter.value;
    var guestsFilterValue = guestsFilter.value;


    var filteredByType = getFilteredAds(getFilteredAd, typeFilterValue, 'type', defaultAds);
    var filteredByPrice = getFilteredAds(filterByPrice, priceFilterValue, 'price', filteredByType);
    var filteredByRooms = getFilteredAds(getFilteredAd, roomsFilterValue, 'rooms', filteredByPrice);
    var filteredByGuests = getFilteredAds(getFilteredAd, guestsFilterValue, 'guests', filteredByRooms);
    var filteredByFeatures = getFilteredAds(filterByFeatures, getCheckedFeatures(featuresFilters), 'features', filteredByGuests);

    removeCard();
    removePins();
    renderPins(filteredByFeatures);
  });

  var setFilterActive = function (elements) {
    getDefaultAds(elements);
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
