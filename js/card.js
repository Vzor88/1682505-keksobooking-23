import {markerGroup, addMapMarker} from './map.js';
import {filtersFormArray, getAttributeRemoveDisabled} from './activate-form.js';
import {getFiltersFeatures, getFiltersGuests, getFiltersPrice, getFiltersRooms, getFiltersType} from './filters.js';

const buildAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');
const buildListFragment = document.createDocumentFragment();
const COUNT_ADVERTS = 10;

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

const getRandRooms = (count) => {
  let descriptionRooms = `${count} комнат`;
  if (count === 1) {
    descriptionRooms = `${count} комната`;
  } else if (count >= 2 && count < 5 ) {
    descriptionRooms = `${count} комнаты`;
  }
  return descriptionRooms;
};

const getRandGuests = (count) => (count === 1) ? `${count} гостя` : `${count} гостей`;

const checkingEmptyElement = (selector, element) => (!element) ? selector.textContent = '' : element;

const getFiltersAdvert = (array) => array.slice().filter(getFiltersType).filter(getFiltersPrice).filter(getFiltersRooms).filter(getFiltersGuests).filter(getFiltersFeatures).slice(0, COUNT_ADVERTS);

const renderAdvertList = (buildAdvert) => {
  markerGroup.clearLayers();
  getFiltersAdvert(buildAdvert)
    .forEach((advert) => {
      const buildItemCard = buildAdvertTemplate.cloneNode(true);
      buildItemCard.querySelector('.popup__avatar').src = advert.author.avatar;
      checkingEmptyElement(buildItemCard.querySelector('.popup__title'), advert.offer.title);
      buildItemCard.querySelector('.popup__title').textContent = advert.offer.title;
      buildItemCard.querySelector('.popup__text--address').textContent = advert.offer.address;
      buildItemCard.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
      buildItemCard.querySelector('.popup__type').textContent = advert.offer.type;
      buildItemCard.querySelector('.popup__text--capacity').textContent = `${getRandRooms(advert.offer.rooms)}  для ${getRandGuests(advert.offer.guests)}`;
      buildItemCard.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
      getDisplayFeaturesList(advert.offer.features, buildItemCard.querySelector('.popup__features'));
      checkingEmptyElement(buildItemCard.querySelector('.popup__description'), advert.offer.description);
      buildItemCard.querySelector('.popup__description').textContent = advert.offer.description;
      getDisplayPhotosList(advert.offer.photos, buildItemCard.querySelector('.popup__photos'));
      buildListFragment.appendChild(buildItemCard);
      addMapMarker(advert.location.lat, advert.location.lng, buildItemCard);
    });
  getAttributeRemoveDisabled(filtersFormArray);
};

export {renderAdvertList};
