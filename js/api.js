import {renderAdvertList} from './card.js';
import {showAlert} from './utils.js';

const getData = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adverts) => {
      renderAdvertList(adverts);
    })
    .catch(() => {
      showAlert(' Не удалось получить данные с сервера. Попробуйте ещё раз ');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method:'POST',
      body,
    },
  ).then((response) => {
    if(response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
