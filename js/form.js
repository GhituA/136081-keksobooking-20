'use strict';

(function () {
  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var roomCapacityMap = {
    '0': 'any',
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


  var onCheckValidity = function (rooms, guests) {
    if (!roomCapacityMap[rooms].includes(guests)) {
      roomSelect.setCustomValidity(errorMap[rooms]);
    } else {
      roomSelect.setCustomValidity('');
    }
  };

  roomSelect.addEventListener('change', function () {
    var roomsCount = roomSelect.value;
    var guestsCount = capacitySelect.value;
    for (var j = 0; j < capacitySelect.options.length; j++) {
      capacitySelect.options[j].disabled = !roomCapacityMap[roomsCount].includes(capacitySelect.options[j].value);
    }
    onCheckValidity(roomsCount, guestsCount);
  });

  capacitySelect.addEventListener('change', function () {
    var roomsCount = roomSelect.value;
    var guestsCount = capacitySelect.value;
    onCheckValidity(roomsCount, guestsCount);
  });

})();
