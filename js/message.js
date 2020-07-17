'use strict';

(function () {

  var mainElement = document.querySelector('main');

  var oneEscPress = function (evt) {
    var successElement = document.querySelector('.success');
    var errorElement = document.querySelector('.error');

    if (evt.key === 'Escape' && successElement) {
      successElement.remove();
      document.removeEventListener('keydown', oneEscPress);
    } else if (evt.key === 'Escape' && errorElement) {
      errorElement.remove();
      document.removeEventListener('keydown', oneEscPress);
    }
  };

  var onMessageClose = function (element) {
    element.remove();
    document.removeEventListener('keydown', oneEscPress);
  };

  var getMessageElement = function (eventName) {
    var messageTemplate = document.querySelector('#' + eventName).content.querySelector('.' + eventName);
    var messageElement = messageTemplate.cloneNode(true);

    messageElement.addEventListener('click', function () {
      onMessageClose(messageElement);
    });
    document.addEventListener('keydown', oneEscPress);

    if (eventName === 'error') {
      messageElement.querySelector('button').addEventListener('click', function () {
        onMessageClose(messageElement);
      });
    }

    return messageElement;
  };

  var renderMessage = function (element) {
    mainElement.appendChild(getMessageElement(element));
  };

  window.message = {
    renderMessage: renderMessage
  };
})();
