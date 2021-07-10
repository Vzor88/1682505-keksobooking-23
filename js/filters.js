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

const COUNT_ADVERTS = 10;

const getFiltersType = (element) => fieldFiltersType.value === element.offer.type || fieldFiltersType.value === 'any';
const getFiltersRooms = (element) => fieldFiltersRooms.value === String (element.offer.rooms) || fieldFiltersRooms.value === 'any';
const getFiltersGuests = (element) => (fieldFiltersGuests.value === 'any') ? element : (fieldFiltersGuests.value === String (element.offer.guests));

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

const getFiltersFeatures = (element) => {
  const checkedFeatures = mapFeatures.querySelectorAll('.map__checkbox:checked');
  return Array.from(checkedFeatures).every((checkedFeature) => {
    if (element.offer.features) {
      return element.offer.features.includes(checkedFeature.value);
    }
  });
};

const getFiltersAdvert = (array) => {
  const filteredAdverts = [];
  for (let index = 0; index < array.length; index++){
    if (getFiltersType(array[index]) && getFiltersRooms(array[index]) && getFiltersPrice(array[index]) && getFiltersGuests(array[index]) && getFiltersFeatures(array[index])){
      filteredAdverts.push(array[index]);
    }
    if (filteredAdverts.length > COUNT_ADVERTS) {
      break;
    }
  }
  return filteredAdverts;
};

const getFiltersElements = (callback) => {
  filtersFormArray.forEach((item) => {
    item.addEventListener('change', () => {
      callback();
    });
  });
};

export {getFiltersElements, getFiltersAdvert};
