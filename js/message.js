import {isEscEvent} from './utils.js';
import {resetForm} from './form.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

const getRemoveMessage = () => {
  const textMessageSuccess = document.querySelector('.success');
  const textMessageError = document.querySelector('.error');

  if (textMessageSuccess) {
    textMessageSuccess.remove();
    resetForm.click();
  } else if (textMessageError){
    textMessageError.remove();
  }
};

const onPageClick = () => {
  getRemoveMessage();
  removeEventListener('click', onPageClick);
};

const onEscPress = (evt) => {
  if (isEscEvent(evt)) {
    getRemoveMessage();

    document.removeEventListener('keydown', onEscPress);
  }
};

const onButtonPress = () => {
  getRemoveMessage();

  errorButton.removeEventListener('click', onButtonPress);
};

const postMessageSuccess = () => {
  const message = successMessage.cloneNode(true);
  document.body.appendChild(message);

  document.addEventListener('click', onPageClick);
  document.addEventListener('keydown', onEscPress);
};

const postMessageError = () => {
  const message = errorMessage.cloneNode(true);
  document.body.appendChild(message);

  document.addEventListener('click', onPageClick);
  document.addEventListener('keydown', onEscPress);
  errorButton.addEventListener('click', onButtonPress);
};

export {postMessageError, postMessageSuccess};

