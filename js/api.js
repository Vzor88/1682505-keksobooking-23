const BASE_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } onFail();
    })
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    BASE_URL,
    {
      method:'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
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
