import './activate-form.js';
import './map.js';
import './card.js';
import './form.js';
import {getData} from './api.js';
import {renderAdvertList} from './card.js';
import {showAlert} from './utils.js';

getData(
  (adverts) => renderAdvertList(adverts),
  () => showAlert(' Не удалось получить данные с сервера. Попробуйте ещё раз '),
);
