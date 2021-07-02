import {mainPinMarker} from './map.js';
import {isEscEvent} from './utils.js';
import {sendData} from './api.js';

const resetForm = document.querySelector('.ad-form__reset');
const submitForm = document.querySelector('.ad-form');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const entryFieldTitle = document.querySelector('#title');
const entryFieldPrice = document.querySelector('#price');
const entryFieldType = document.querySelector('#type');
const fieldRooms = document.querySelector('#room_number');
const fieldCapacity = document.querySelector('#capacity');
const fieldTimeIn = document.querySelector('#timein');
const fieldTimeOut = document.querySelector('#timeout');
const fieldAddress = document.querySelector('#address');
const parentCapacity = document.querySelector('.ad-form__element--capacity');
const selectsList = document.querySelectorAll('.map__filter');
const checkboxesList = document.querySelectorAll('.map__checkbox');

const DEFAULT_COORDINATES = {
  LATITUDE: 35.68950,
  LONGITUDE: 139.69171,
};

const LENGTH_FIELD_TITLE = {
  MIN: 30,
  MAX: 100,
};

const FIELD_PRICE = {
  MAX_PRICE: 1000000,
  MIN_PRICE: {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  },
};

function isResetElements(arraySelects, arrayCheckboxes) {
  arraySelects.forEach((item) => item.options[0].selected = true);
  arrayCheckboxes.forEach((item) => item.checked = false);
}

function determinationMinPrice() {
  for(const typeProperty in FIELD_PRICE.MIN_PRICE){
    if(entryFieldType.value === typeProperty) {
      entryFieldPrice.setAttribute('placeholder', FIELD_PRICE.MIN_PRICE[entryFieldType.value]);
      return FIELD_PRICE.MIN_PRICE[entryFieldType.value];
    }
  }
}

entryFieldTitle.addEventListener('input', () => {
  const valueLength = entryFieldTitle.value.length;
  if (valueLength < LENGTH_FIELD_TITLE.MIN) {
    entryFieldTitle.setCustomValidity(`Ещё необходимо ${LENGTH_FIELD_TITLE.MIN - valueLength } символов`);
  } else if (valueLength > LENGTH_FIELD_TITLE.MAX) {
    entryFieldTitle.setCustomValidity(`Удалите лишние ${valueLength - LENGTH_FIELD_TITLE.MAX} символов`);
  } else {
    entryFieldTitle.setCustomValidity('');
  }
  entryFieldTitle.reportValidity();
});

entryFieldType.addEventListener('change',() => {
  determinationMinPrice();
  entryFieldPrice.value = '';
});

entryFieldPrice.addEventListener('input', () => {
  const valuePrice = entryFieldPrice.value;
  if(valuePrice > FIELD_PRICE.MAX_PRICE) {
    entryFieldPrice.setCustomValidity(`Цена должна быть меньше на ${valuePrice - FIELD_PRICE.MAX_PRICE}`);
  } else if (valuePrice < determinationMinPrice()) {
    entryFieldPrice.setCustomValidity(`Цена должна быть больше на ${determinationMinPrice() - valuePrice}`);
  } else {
    entryFieldPrice.setCustomValidity('');
  }
  entryFieldPrice.reportValidity();
});

fieldTimeIn.addEventListener('change', () => {
  fieldTimeOut.value = fieldTimeIn.value;
});

fieldTimeOut.addEventListener('change', () => {
  fieldTimeIn.value = fieldTimeOut.value;
});


function isResetFieldCapacity(list) {
  parentCapacity.appendChild(list);
  list.classList.add('capacity');
  document.querySelector('.capacity').remove();
  fieldCapacity.remove();
  parentCapacity.appendChild(list);
}

function isMatchingFields(){
  const newFieldCapacity = fieldCapacity.cloneNode(true);
  const listCapacity = Array.from(newFieldCapacity);
  isResetFieldCapacity(newFieldCapacity);
  if(fieldRooms.value === '1') {
    listCapacity[0].remove();
    listCapacity[1].remove();
    listCapacity[3].remove();
  } else if (fieldRooms.value === '2') {
    listCapacity[0].remove();
    listCapacity[3].remove();
  } else if (fieldRooms.value === '3') {
    listCapacity[3].remove();
  } else {
    listCapacity[0].remove();
    listCapacity[1].remove();
    listCapacity[2].remove();
  }
}

function defaultFieldAddress(){
  fieldAddress.setAttribute('value', `${Number(DEFAULT_COORDINATES.LATITUDE).toFixed(5)}, ${Number(DEFAULT_COORDINATES.LONGITUDE).toFixed(5)}`);
  fieldAddress.setAttribute('readonly', 'readonly');
}

fieldRooms.addEventListener('change', () => {
  isMatchingFields();
});

document.addEventListener('DOMContentLoaded', isMatchingFields);
document.addEventListener('DOMContentLoaded', defaultFieldAddress);

resetForm.addEventListener('click', () => {
  entryFieldTitle.value = '';
  isResetElements(selectsList, checkboxesList);
  defaultFieldAddress();
  mainPinMarker.setLatLng({
    lat: Number(DEFAULT_COORDINATES.LATITUDE).toFixed(5),
    lng: Number(DEFAULT_COORDINATES.LONGITUDE).toFixed(5),
  });
});

function outputMessage (element) {
  document.body.appendChild(element);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      element.remove();
      if(element === successMessage) {
        resetForm.click();
      }
    }
  });
  element.addEventListener('click', (evt) => {
    if (evt.target) {
      element.remove();
      if(element === successMessage) {
        resetForm.click();
      }
    }
  });
  document.removeEventListener('keydown', (outputMessage));
  document.removeEventListener('click', (outputMessage));
}

submitForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => outputMessage(successMessage),
    () => outputMessage(errorMessage),
    new FormData(evt.target),
  );
});


export {DEFAULT_COORDINATES, fieldAddress};
