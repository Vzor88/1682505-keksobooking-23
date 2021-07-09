import {markerGroup, addMapMarker} from './map.js';
import {getFiltersAdvert} from './filters.js';
import {loadMap} from './map.js';
import {declOfNum} from './utils.js';

const TYPE_TRANSLATE_RUS = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const buildAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');
const buildListFragment = document.createDocumentFragment();

const getDisplayFeaturesList = (array, itemList) => {
  if (Array.isArray(array)) {
    const modifiers = array.map ((feature) => `popup__feature--${feature}`);
    itemList.querySelectorAll ('.popup__feature').forEach ((element) => {
      const modifier = element.classList[1];
      if (!modifiers.includes(modifier)) {
        element.remove();
      }
    });
  } else {
    itemList.remove();
  }
};

const getDisplayPhotosList = (array, itemList) => {
  if (Array.isArray(array)) {
    const photosItem = itemList.querySelector('.popup__photo');
    photosItem.remove();
    array.forEach((string) => {
      const photosElement = photosItem.cloneNode(true);
      photosElement.src = string;
      itemList.appendChild(photosElement);
    });
  } else {
    itemList.remove();
  }
};

const getRandRooms = (count) => `${count} ${declOfNum(count, ['комната','комнаты', 'комнат'])}` ;
const getRandGuests = (count) => `${count} ${declOfNum(count, ['гостя', 'гостей', 'гостей'])}`;


const getCheckingEmpty = (selector, element) => (!element) ? selector.textContent = '' : element;

const getCheckingElementsAdvert = (item, data) => {
  getCheckingEmpty(item.querySelector('.popup__avatar'), data.author.avatar);
  getCheckingEmpty(item.querySelector('.popup__title'), data.offer.title);
  getCheckingEmpty(item.querySelector('.popup__text--address'), data.offer.address);
  getCheckingEmpty(item.querySelector('.popup__text--price'), data.offer.price);
  getCheckingEmpty(item.querySelector('.popup__type'), data.offer.type);
  getCheckingEmpty(item.querySelector('.popup__text--capacity'), data.offer.rooms);
  getCheckingEmpty(item.querySelector('.popup__text--capacity'), data.offer.guests);
  getCheckingEmpty(item.querySelector('.popup__text--time'), data.offer.checkin);
  getCheckingEmpty(item.querySelector('.popup__text--time'), data.offer.checkout);
  getCheckingEmpty(item.querySelector('.popup__description'), data.offer.description);
};

const getCreateAdvert = (itemCard, advert) => {
  getCheckingElementsAdvert(itemCard, advert);
  itemCard.querySelector('.popup__avatar').src = advert.author.avatar;
  itemCard.querySelector('.popup__title').textContent = advert.offer.title;
  itemCard.querySelector('.popup__text--address').textContent = advert.offer.address;
  itemCard.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  itemCard.querySelector('.popup__type').textContent = TYPE_TRANSLATE_RUS[advert.offer.type];
  itemCard.querySelector('.popup__text--capacity').textContent = `${getRandRooms(advert.offer.rooms)}  для ${getRandGuests(advert.offer.guests)}`;
  itemCard.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  getDisplayFeaturesList(advert.offer.features, itemCard.querySelector('.popup__features'));
  itemCard.querySelector('.popup__description').textContent = advert.offer.description;
  getDisplayPhotosList(advert.offer.photos, itemCard.querySelector('.popup__photos'));
  buildListFragment.appendChild(itemCard);
};

const renderAdvertList = (buildAdverts) => {
  loadMap();
  markerGroup.clearLayers();
  getFiltersAdvert(buildAdverts)
    .forEach((advert) => {
      const buildItemCard = buildAdvertTemplate.cloneNode(true);
      getCreateAdvert(buildItemCard, advert);
      addMapMarker(advert.location.lat, advert.location.lng, buildItemCard);
    });
};

export {renderAdvertList};
