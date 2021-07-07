import {mainPinMarker} from './map.js';
import {isEscEvent} from './utils.js';
import {sendData} from './api.js';
import {avatarPreview} from './image.js';

const resetForm = document.querySelector('.ad-form__reset');
const submitForm = document.querySelector('.ad-form');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const fieldTitle = document.querySelector('#title');
const fieldPrice = document.querySelector('#price');
const fieldType = document.querySelector('#type');
const fieldRooms = document.querySelector('#room_number');
const fieldCapacity = document.querySelector('#capacity');
const fieldTimeIn = document.querySelector('#timein');
const fieldTimeOut = document.querySelector('#timeout');
const fieldAddress = document.querySelector('#address');
const parentCapacity = document.querySelector('.ad-form__element--capacity');
const selectsListFilters = document.querySelectorAll('.map__filter');
const checkboxesListFilters = document.querySelectorAll('.map__checkbox');

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

const isResetElements = (arraySelects, arrayCheckboxes) => {
  arraySelects.forEach((item) => item.options[0].selected = true);
  arrayCheckboxes.forEach((item) => item.checked = false);
};

const isResetFieldCapacity = (list) => {
  parentCapacity.appendChild(list);
  list.classList.add('capacity');
  document.querySelector('.capacity').remove();
  fieldCapacity.remove();
  parentCapacity.appendChild(list);
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

const determinationMinPrice = () => {
  for (const typeProperty in FIELD_PRICE.MIN) {
    if (fieldType.value === typeProperty) {
      fieldPrice.setAttribute('placeholder', FIELD_PRICE.MIN[fieldType.value]);
      return FIELD_PRICE.MIN[fieldType.value];
    }
  }
};

const isMatchingFields = () => {
  const newFieldCapacity = fieldCapacity.cloneNode(true);
  const listCapacity = Array.from(newFieldCapacity);
  isResetFieldCapacity(newFieldCapacity);
  if (fieldRooms.value === '1') {
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
  });
  element.addEventListener('click', (evt) => {
    if (evt.target) {
      element.remove();
      if (element === successMessage) {
        resetForm.click();
      }
    }
  });
  document.removeEventListener('keydown', (getOutputMessage));
  document.removeEventListener('click', (getOutputMessage));
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
  determinationMinPrice();
  fieldPrice.value = '';
});

fieldPrice.addEventListener('input', () => {
  const valuePrice = fieldPrice.value;
  if(valuePrice > FIELD_PRICE.MAX) {
    fieldPrice.setCustomValidity(`Цена должна быть меньше на ${valuePrice - FIELD_PRICE.MAX}`);
  } else if (valuePrice < determinationMinPrice()) {
    fieldPrice.setCustomValidity(`Цена должна быть больше на ${determinationMinPrice() - valuePrice}`);
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
  isMatchingFields();
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
});

submitForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => getOutputMessage(successMessage),
    () => getOutputMessage(errorMessage),
    new FormData(evt.target),
  );
});

document.addEventListener('DOMContentLoaded', isMatchingFields);
document.addEventListener('DOMContentLoaded', isDefaultFieldAddress);

export {DEFAULT_COORDINATES, fieldAddress, FLOATING_POINT_NUMBER};
