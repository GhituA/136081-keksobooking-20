'use strict';

(function () {

  var mainElement = document.querySelector('main');

  var oneEscPress = function (evt) {
    var element = document.querySelector('.success');
    if (evt.key === 'Escape') {
      element.remove();
      document.removeEventListener('keydown', oneEscPress);
    }
  };

  var onMessageClose = function (element) {
    element.remove();
    document.removeEventListener('keydown', oneEscPress);
  };

  var getMessageElement = function (idName) {
    var messageTemplate = document.querySelector(idName).content.querySelector('div');
    var messageElement = messageTemplate.cloneNode(true);

    messageElement.addEventListener('click', onMessageClose(messageElement));
    document.addEventListener('keydown', oneEscPress);

    return messageElement;
  };

  var renderMessage = function (element) {
    mainElement.appendChild(getMessageElement(element));
  };

  window.message = {
    renderMessage: renderMessage
  };
})();
