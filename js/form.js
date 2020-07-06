'use strict';

(function () {
  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');


  roomSelect.addEventListener('change', function () {
    var roomCapacityMap = {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    };
    var errorMap = {
      '1': 'В 1 комнату можно поселить только 1 гостя',
      '2': 'В 2 комнаты можно поселить максимум 2 гостей',
      '3': 'В 3 комнаты можно поселить максимум 3 гостей',
      '100': 'В 100 комнат нельзя заселять гостей'
    };
    var roomsCount = roomSelect.value;
    var guestsCount = capacitySelect.value;

    for (var j = 0; j < capacitySelect.options.length; j++) {
      capacitySelect.options[j].hidden = !roomCapacityMap[roomsCount].includes(capacitySelect[j].value);
    }
    if (!roomCapacityMap[roomsCount].includes(guestsCount)) {
      roomSelect.setCustomValidity(errorMap[roomsCount]);
    } else {
      roomSelect.setCustomValidity('');
    }
  });
})();
