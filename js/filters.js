import {checkboxesListFilters, selectsListFilters} from './form.js';

const fieldFiltersType = document.querySelector('#housing-type');
const fieldFiltersPrice = document.querySelector('#housing-price');
const fieldFiltersRooms = document.querySelector('#housing-rooms');
const fieldFiltersGuests = document.querySelector('#housing-guests');
const mapFeatures = document.querySelector('.map__features');

const PRICE_FIELD_FILTERS = {
  LOW: 10000,
  HIGH: 50000,
};

function getFiltersType(element) {
  return fieldFiltersType.value === element.offer.type || fieldFiltersType.value === 'any';
}

function getFiltersPrice(element) {
  if(fieldFiltersPrice.value === 'low' && element.offer.price < PRICE_FIELD_FILTERS.LOW ){
    return element;
  } else if(fieldFiltersPrice.value === 'middle' && element.offer.price <= PRICE_FIELD_FILTERS.HIGH && element.offer.price >= PRICE_FIELD_FILTERS.LOW ){
    return element;
  } else if(fieldFiltersPrice.value === 'high' && element.offer.price > PRICE_FIELD_FILTERS.HIGH ){
    return element;
  } else if(fieldFiltersPrice.value === 'any'){
    return element;
  }
}

function getFiltersRooms(element) {
  return fieldFiltersRooms.value === String(element.offer.rooms) || fieldFiltersRooms.value === 'any';
}

function getFiltersGuests(element) {
  if(fieldFiltersGuests.value === String(element.offer.guests)){
    return element;
  } else if(fieldFiltersGuests.value === 'any'){
    return element;
  } else if(fieldFiltersGuests.value === '0' && element.offer.guests > 2){     // не сильно понятно это поле <option value="0">Не для гостей</option>
    return element;                                                            //  пока установил этот фильтр как для более чем 2 гостей, но нужно уточнение, это врядли правильно
  }
}

function getFiltersFeatures(element) {
  const checkedFeatures = mapFeatures.querySelectorAll('.map__checkbox:checked');
  return Array.from(checkedFeatures).every((checkedFeature) => {
    if(element.offer.features) {
      return element.offer.features.includes(checkedFeature.value);
    }
  });
}

const selectsFilters = (callback) => {
  selectsListFilters.forEach((item) => {
    item.addEventListener('change', () => {
      callback();
    });
  });
};

const filtersFeatures = (callback) => {
  checkboxesListFilters.forEach((item) => {
    item.addEventListener('change', () => {
      callback();
    });
  });
};

export {getFiltersType, getFiltersPrice, getFiltersRooms, getFiltersGuests, getFiltersFeatures, selectsFilters, filtersFeatures};
