const TITLES = [
  'Продаю отличную квартиру!',
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

const ADVERT_COUNT = 10;
const PRICE_MIN = 1;
const PRICE_MAX = 1000000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 10;
const GUESTS_MIN = 1;
const GUESTS_MAX = 100;
const LOCATION_LATITUDE_MIN = 35.65000;
const LOCATION_LATITUDE_MAX = 35.70000;
const LOCATION_LONGITUDE_MIN = 139.70000;
const LOCATION_LONGITUDE_MAX = 139.80000;
const FLOATING_POINT = 5;

function getRandFloat(minNumber, maxNumber, float) {
  if(minNumber < 0 || maxNumber <= minNumber) {
    throw new Error('Неправильно введены данные: допускается использование любого положительного числа больше 0, а так же "до" должно быть больше "от"');
  }
  return Number((Math.random() * (maxNumber - minNumber) + minNumber).toFixed(float));
}

function getRandInt(minNumber, maxNumber) {
  if (minNumber < 0 || maxNumber <= minNumber) {
    throw new Error('Неправильно введены данные: допускается использование любого целого положительного числа больше 0, а так же "до" должно быть больше "от"');
  }
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

function getRandArray(array) {
  const randomArray = new Array(getRandInt (1, array.length + 1)).fill(null).map(() => array[getRandInt (0, array.length -1)]);
  return Array.from(new Set(randomArray));
}

function getAvatar(number) {
  return (number < 10) ? `img/avatars/user0${number}.png` : `img/avatars/user${number}.png`;
}

const createAdvert = function (number) {
  const randomLatitude = getRandFloat(LOCATION_LATITUDE_MIN, LOCATION_LATITUDE_MAX, FLOATING_POINT);
  const randomLongitude = getRandFloat(LOCATION_LONGITUDE_MIN, LOCATION_LONGITUDE_MAX, FLOATING_POINT);
  return {
    author: {
      avatar: getAvatar(number),
    },
    offer: {
      title: TITLES[getRandInt (0, TITLES.length -1)],
      address: `${randomLatitude}, ${randomLongitude}`,
      price: getRandInt (PRICE_MIN, PRICE_MAX),
      type: TYPES[getRandInt (0, TYPES.length -1)],
      rooms: getRandInt (ROOMS_MIN, ROOMS_MAX),
      guests: getRandInt (GUESTS_MIN, GUESTS_MAX),
      checkin: FIXED_TIMES[getRandInt (0, FIXED_TIMES.length -1)],
      checkout: FIXED_TIMES[getRandInt (0, FIXED_TIMES.length -1)],
      features: getRandArray(PROPERTIES),
      description: DESCRIPTIONS[getRandInt (0, DESCRIPTIONS.length -1)],
      photos: getRandArray(PHOTOS),
    },
    location: {
      lat: randomLatitude,
      lng: randomLongitude,
    },
  };
};

const setAdverts = new Array(ADVERT_COUNT).fill(null).map((value,index) => value =  createAdvert(index + 1));

setAdverts;
