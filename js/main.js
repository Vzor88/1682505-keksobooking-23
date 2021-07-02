import './activate-form.js';
import './map.js';
import './card.js';
import './form.js';
import {renderAdvertList} from './card.js';

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((adverts) => {
    renderAdvertList(adverts);
  });
