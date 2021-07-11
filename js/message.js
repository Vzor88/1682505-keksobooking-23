import {isEscEvent} from './utils.js';
import {resetForm} from './form.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

const ALERT_SHOW_TIME = 10000;

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

const getAddMessage = (messageElement) => {
  const message = messageElement.cloneNode(true);
  document.body.appendChild(message);
};

const postMessageSuccess = () => {
  getAddMessage(successMessage);

  document.addEventListener('click', onPageClick);
  document.addEventListener('keydown', onEscPress);
};

const postMessageError = () => {
  getAddMessage(errorMessage);

  document.addEventListener('click', onPageClick);
  document.addEventListener('keydown', onEscPress);
  errorButton.addEventListener('click', onButtonPress);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '10000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {postMessageError, postMessageSuccess, showAlert};

