'use strict';
(function () {

  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var UPLOAD_URL = 'https://javascript.pages.academy/keksobooking';
  var statusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 10px 0; text-align: center; background-color: rgba(255, 0, 0, 0.65); color: white';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var checkUploadStatus = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
  };

  var checkloadStatus = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };

  var onXHRload = function (url, method, statusCheck, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    statusCheck(xhr, onSuccess, onError);

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (onSuccess, onError) {
    onXHRload(LOAD_URL, 'GET', checkloadStatus, onSuccess, onError);
  };

  var upload = function (data, onSuccess, onError) {
    onXHRload(UPLOAD_URL, 'POST', checkUploadStatus, onSuccess, onError, data);
  };

  window.load = {
    onLoadError: onLoadError,
    load: load,
    upload: upload
  };

})();
