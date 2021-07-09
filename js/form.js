import {mainPinMarker} from './map.js';
import {isEscEvent} from './utils.js';
import {sendData} from './api.js';
import {avatarPreview} from './image.js';
import {loadAdvert} from './main.js';

const submitForm = document.querySelector('.ad-form');
const resetForm = submitForm.querySelector('.ad-form__reset');
const fieldTitle = submitForm.querySelector('#title');
const fieldPrice = submitForm.querySelector('#price');
const fieldType = submitForm.querySelector('#type');
const fieldRooms = submitForm.querySelector('#room_number');
const fieldCapacity = submitForm.querySelector('#capacity');
const fieldCapacityOptions = fieldCapacity.querySelectorAll('option');
const fieldTimeIn = submitForm.querySelector('#timein');
const fieldTimeOut = submitForm.querySelector('#timeout');
const fieldAddress = submitForm.querySelector('#address');
const selectsListFilters = document.querySelectorAll('.map__filter');
const checkboxesListFilters = document.querySelectorAll('.map__checkbox');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const FLOATING_POINT_NUMBER = 5;
const URL_DEFAULT_AVATAR = 'img/muffin-grey.svg';

const DEFAULT_COORDINATES = {
  LATITUDE: 35.68950,
  LONGITUDE: 139.69171,
};

const LENGTH_FIELD_TITLE = {
  MIN: 30,
  MAX: 100,
};

const FIELD_PRICE = {
  MAX: 1000000,
  MIN: {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  },
};

const COUNT_ROOMS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const isResetElements = (arraySelects, arrayCheckboxes) => {
  arraySelects.forEach((item) => item.options[0].selected = true);
  arrayCheckboxes.forEach((item) => item.checked = false);
};

const isDisabledFieldCapacity = () => {
  for( let index = 0; index < fieldCapacity.length; index++) {
    fieldCapacity.options[index].setAttribute('disabled', 'disabled');
  }
};

const isDefaultFieldAddress = () => {
  fieldAddress.setAttribute('value', `${Number(DEFAULT_COORDINATES.LATITUDE).toFixed(FLOATING_POINT_NUMBER)}, ${Number(DEFAULT_COORDINATES.LONGITUDE).toFixed(FLOATING_POINT_NUMBER)}`);
  fieldAddress.setAttribute('readonly', 'readonly');
};

const isDefaultPicture = () => {
  avatarPreview.src = URL_DEFAULT_AVATAR;
  const images = document.querySelectorAll('.ad-form__photo-picture');
  images.forEach((image) => {
    image.remove();
  });
};

const getDeterminationMinPrice = () => {
  for (const typeProperty in FIELD_PRICE.MIN) {
    if (fieldType.value === typeProperty) {
      fieldPrice.setAttribute('placeholder', FIELD_PRICE.MIN[fieldType.value]);
      return FIELD_PRICE.MIN[fieldType.value];
    }
  }
};

const isMatchingFields = (count) => {
  isDisabledFieldCapacity();
  COUNT_ROOMS[count].forEach((item) => {
    fieldCapacityOptions.forEach((option) => {
      if (Number(option.value) === item) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const getOutputMessage = (element) => {
  document.body.appendChild(element);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      element.remove();
      if (element === successMessage) {
        resetForm.click();
      }
    }
    document.removeEventListener('keydown', (getOutputMessage));
  });
  element.addEventListener('click', (evt) => {
    if (evt.target) {
      element.remove();
      if (element === successMessage) {
        resetForm.click();
      }
    }
    document.removeEventListener('click', (getOutputMessage));
  });
};

fieldTitle.addEventListener('input', () => {
  const valueLength = fieldTitle.value.length;
  if (valueLength < LENGTH_FIELD_TITLE.MIN) {
    fieldTitle.setCustomValidity(`Ещё необходимо ${LENGTH_FIELD_TITLE.MIN - valueLength } символов`);
  } else if (valueLength > LENGTH_FIELD_TITLE.MAX) {
    fieldTitle.setCustomValidity(`Удалите лишние ${valueLength - LENGTH_FIELD_TITLE.MAX} символов`);
  } else {
    fieldTitle.setCustomValidity('');
  }
  fieldTitle.reportValidity();
});

fieldType.addEventListener('change',() => {
  getDeterminationMinPrice();
  fieldPrice.value = '';
});

fieldPrice.addEventListener('input', () => {
  const valuePrice = fieldPrice.value;
  if(valuePrice > FIELD_PRICE.MAX) {
    fieldPrice.setCustomValidity(`Цена должна быть меньше на ${valuePrice - FIELD_PRICE.MAX}`);
  } else if (valuePrice < getDeterminationMinPrice()) {
    fieldPrice.setCustomValidity(`Цена должна быть больше на ${getDeterminationMinPrice() - valuePrice}`);
  } else {
    fieldPrice.setCustomValidity('');
  }
  fieldPrice.reportValidity();
});

fieldTimeIn.addEventListener('change', () => {
  fieldTimeOut.value = fieldTimeIn.value;
});

fieldTimeOut.addEventListener('change', () => {
  fieldTimeIn.value = fieldTimeOut.value;
});


fieldRooms.addEventListener('change', () => {
  isMatchingFields(fieldRooms.value);
});

resetForm.addEventListener('click', () => {
  fieldTitle.value = '';
  isResetElements(selectsListFilters, checkboxesListFilters);
  isDefaultFieldAddress();
  mainPinMarker.setLatLng({
    lat: Number(DEFAULT_COORDINATES.LATITUDE).toFixed(FLOATING_POINT_NUMBER),
    lng: Number(DEFAULT_COORDINATES.LONGITUDE).toFixed(FLOATING_POINT_NUMBER),
  });
  isDefaultPicture();
  loadAdvert();
});

submitForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => getOutputMessage(successMessage),
    () => getOutputMessage(errorMessage),
    new FormData(evt.target),
  );
});

const onWindowDefaultFields = () => {
  isMatchingFields(1);
  isDefaultFieldAddress();
};

document.addEventListener('DOMContentLoaded', onWindowDefaultFields);

export {DEFAULT_COORDINATES, fieldAddress, FLOATING_POINT_NUMBER};
