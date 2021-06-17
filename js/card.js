import {setAdverts} from './data';

const simularCardList = document.querySelector('.map__canvas');
const simularAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');


const simularAdvert = setAdverts();
simularAdvert.forEach(() => {
  const simularItemCard = simularAdvertTemplate.cloneNode(true);
  simularCardList.appendChild(simularItemCard);
});

