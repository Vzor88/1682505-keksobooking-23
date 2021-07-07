import {filtersFormArray} from './activate-form.js';

const fieldFiltersType = document.querySelector('#housing-type');
const fieldFiltersPrice = document.querySelector('#housing-price');
const fieldFiltersRooms = document.querySelector('#housing-rooms');
const fieldFiltersGuests = document.querySelector('#housing-guests');
const mapFeatures = document.querySelector('.map__features');

const PRICE_FIELD_FILTERS = {
  LOW: 10000,
  HIGH: 50000,
};

const getFiltersType = (element) => fieldFiltersType.value === element.offer.type || fieldFiltersType.value === 'any';
const getFiltersRooms = (element) => fieldFiltersRooms.value === String (element.offer.rooms) || fieldFiltersRooms.value === 'any';

const getFiltersPrice = (element) => {
  if (fieldFiltersPrice.value === 'low' && element.offer.price < PRICE_FIELD_FILTERS.LOW ){
    return element;
  } else if (fieldFiltersPrice.value === 'middle' && element.offer.price <= PRICE_FIELD_FILTERS.HIGH && element.offer.price >= PRICE_FIELD_FILTERS.LOW ){
    return element;
  } else if (fieldFiltersPrice.value === 'high' && element.offer.price > PRICE_FIELD_FILTERS.HIGH ){
    return element;
  } else if (fieldFiltersPrice.value === 'any'){
    return element;
  }
};

const getFiltersGuests = (element) => {
  if (fieldFiltersGuests.value === String (element.offer.guests)) {
    return element;
  } else if (fieldFiltersGuests.value === 'any') {
    return element;
  } else if (fieldFiltersGuests.value === '0' && element.offer.guests > 2) {
    return element;
  }
};

const getFiltersFeatures = (element) => {
  const checkedFeatures = mapFeatures.querySelectorAll('.map__checkbox:checked');
  return Array.from(checkedFeatures).every((checkedFeature) => {
    if (element.offer.features) {
      return element.offer.features.includes(checkedFeature.value);
    }
  });
};

const getFiltersElements = (callback) => {
  filtersFormArray.forEach((item) => {
    item.addEventListener('change', () => {
      callback();
    });
  });
};

export {getFiltersType, getFiltersPrice, getFiltersRooms, getFiltersGuests, getFiltersFeatures, getFiltersElements};
