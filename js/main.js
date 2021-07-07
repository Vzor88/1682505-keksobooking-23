import {getData} from './api.js';
import {renderAdvertList} from './card.js';
import {showAlert, getDebounce, RERENDER_DELAY} from './utils.js';
import {getFiltersElements} from './filters.js';

getData(
  (adverts) => {
    renderAdvertList (adverts);
    getFiltersElements (getDebounce (() => renderAdvertList (adverts), RERENDER_DELAY));
  },
  () => showAlert (' Не удалось получить данные с сервера. Попробуйте ещё раз '),
);
