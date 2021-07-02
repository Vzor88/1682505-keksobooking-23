import {myMap} from './map.js';

const buildAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');

const buildListFragment = document.createDocumentFragment();

function getDisplayFeaturesList(array, itemList) {
  if(array) {
    const modifiers = array.map((feature) => `popup__feature--${feature}`);
    itemList.querySelectorAll('.popup__feature').forEach((element) => {
      const modifier = element.classList[1];
      if(!modifiers.includes(modifier)) {
        element.remove();
      }
    });
  } else {
    itemList.remove();
  }
}

function getDisplayPhotosList (array, itemList){
  if(array) {
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
}

function getRandRooms(count) {
  let descriptionRooms = `${count} комнат`;
  if(count === 1) {
    descriptionRooms = `${count} комната`;
  }
  if(count >= 2 && count < 5 ) {
    descriptionRooms = `${count} комнаты`;
  }
  return descriptionRooms;
}

function getRandGuests(count) {
  return (count === 1) ? `${count} гостя` : `${count} гостей`;
}

function checkingEmptyElement(selector, element) {
  return (!element) ? selector.textContent = '' : element;
}

function renderAdvertList(buildAdvert) {
  buildAdvert.forEach((advert) => {
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
    const pinBlueIcon = L.icon({
      iconUrl: '../../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const blueMarker = L.marker({lat: advert.location.lat, lng: advert.location.lng},
      {
        icon: pinBlueIcon,
      });
    blueMarker
      .addTo(myMap)
      .bindPopup(buildItemCard);
  });
}

export {renderAdvertList};
