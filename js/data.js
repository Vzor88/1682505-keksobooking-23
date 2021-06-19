import {getRandInt, getRandFloat} from './util.js';

const TITLES = [
  'Сдаётся номер для молодожёнов',
  'Сдам дом в аренду',
  'Продам малогабаритную квартиру',
  'Продам дедушкин дом',
  'Сдаётся номер в 5 звёздочной гостинице',
  'Продам двух этажный дом',
  'Продам дом с участком',
  'Аренда жилья посуточно!',
  'Сдаётся коттедж на длительный срок',
  'Продаётся дом с бассейном',
];

const DESCRIPTIONS = [
  'Жильё находится в чистом и уютном районе',
  'При покупке этой недвижимости, кот "Кекс" достаётся вам в подарок!!',
  'Вам улыбнулась удача! Это мегавыгодное предложение!',
  'Окна выходят на солнечную сторону, и вид из этих окон просто бомбический!',
  'Соседи тихие и не создадут вам проблем',
  'Комнаты изолированные, с хорошей шумоизоляцией',
  'Вся мебель присутствующая на фото включена в стоимость',
  'Принимаются для оплаты любые виды платежей',
  'Стоимость данного жилья намного ниже ананлогичных по рынку, не пожалеете!',
  'Данное объявление представлено агенством недвижимости "Бастион"',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TYPES_RUS = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало',
  'Отель',
];

const FIXED_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const PROPERTIES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LOCATIONS = {
  LATITUDE_MIN: 35.65000,
  LATITUDE_MAX: 35.70000,
  LONGITUDE_MIN: 139.70000,
  LONGITUDE_MAX: 139.80000,
};

const PRICE = {
  MIN: 1,
  MAX: 1000000,
};

const ROOMS = {
  MIN: 1,
  MAX: 10,
};

const GUESTS = {
  MIN: 1,
  MAX: 10,
};

const ADVERT_COUNT = 2;
const FLOATING_POINT = 5;

function getRandArray(array) {
  const randomArray = new Array(getRandInt (1, array.length + 1)).fill(null).map(() => array[getRandInt (0, array.length -1)]);
  return Array.from(new Set(randomArray));
}

function getAvatar(number) {
  return (number < 10) ? `img/avatars/user0${number}.png` : `img/avatars/user${number}.png`;
}

function getRandomElementFromArray(array) {
  return array[getRandInt (0, array.length -1)];
}

function getRandRooms(count) {
  let descriptionRooms = `${count} комнат`;
  if(count === 1) {
    descriptionRooms = `${count} комната`;
  }
  if(count > 2 && count < 5 ) {
    descriptionRooms = `${count} комнаты`;
  }
  return descriptionRooms;
}

function getRandGuests(count) {
  let descriptionGuests = `${count} гостей`;
  if(count === 1) {
    descriptionGuests = `${count} гостя`;
  }
  return descriptionGuests;
}

function getLangRus(array, arrayRus) {
  return arrayRus[getRandInt (0, array.length -1)];
}

function getDisplayFeaturesList(array, itemList) {
  const modifiers = array.map((feature) => `popup__feature--${feature}`);
  itemList.querySelectorAll('.popup__feature').forEach((element) => {
    const modfier = element.classList[1];
    if(!modifiers.includes(modfier)) {
      element.remove();
    }
  });
  return modifiers;
}

function getDisplayPhotosList (array, itemList){
  const photosItem = itemList.querySelector('.popup__photo');
  photosItem.remove();
  for(let item = 0; item < array.length; item++) {
    const photosElement = photosItem.cloneNode(true);
    photosElement.src = array[item];
    itemList.appendChild(photosElement);
  }
}


const createAdvert = function (index) {
  const randomLatitude = getRandFloat(LOCATIONS.LATITUDE_MIN, LOCATIONS.LATITUDE_MAX, FLOATING_POINT);
  const randomLongitude = getRandFloat(LOCATIONS.LONGITUDE_MIN, LOCATIONS.LONGITUDE_MAX, FLOATING_POINT);
  return {
    author: {
      avatar: getAvatar(index),
    },
    offer: {
      title: getRandomElementFromArray(TITLES),
      address: `${randomLatitude}, ${randomLongitude}`,
      price: getRandInt (PRICE.MIN, PRICE.MAX),
      type: getLangRus(TYPES, TYPES_RUS),
      rooms: getRandInt (ROOMS.MIN, ROOMS.MAX),
      guests: getRandInt (GUESTS.MIN, GUESTS.MAX),
      checkin: getRandomElementFromArray(FIXED_TIMES),
      checkout: getRandomElementFromArray(FIXED_TIMES),
      features: getRandArray(PROPERTIES),
      description: getRandomElementFromArray(DESCRIPTIONS),
      photos: getRandArray(PHOTOS),
    },
    location: {
      lat: randomLatitude,
      lng: randomLongitude,
    },
  };
};

const setAdverts = () => new Array(ADVERT_COUNT).fill(null).map((value,index) => createAdvert(index + 1));

export {setAdverts};

const simularCardList = document.querySelector('.map__canvas');
const simularAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');

const simularAdvert = setAdverts();
simularAdvert.forEach((advert) => {
  const simularItemCard = simularAdvertTemplate.cloneNode(true);
  simularItemCard.querySelector('.popup__avatar').src = advert.author.avatar;
  simularItemCard.querySelector('.popup__title').textContent = advert.offer.title;
  simularItemCard.querySelector('.popup__text--address').textContent = advert.offer.address;
  simularItemCard.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  simularItemCard.querySelector('.popup__type').textContent = advert.offer.type;
  simularItemCard.querySelector('.popup__text--capacity').textContent = `${getRandRooms(advert.offer.rooms)}  для ${getRandGuests(advert.offer.guests)}`;
  simularItemCard.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  getDisplayFeaturesList(advert.offer.features, simularItemCard.querySelector('.popup__features'));
  simularCardList.appendChild(simularItemCard);
  simularItemCard.querySelector('.popup__description').textContent = advert.offer.description;
  getDisplayPhotosList(advert.offer.photos, simularItemCard.querySelector('.popup__photos'));
});
