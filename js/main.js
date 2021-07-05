import './activate-form.js';
import './map.js';
import './card.js';
import './form.js';
import {getData} from './api.js';
import {renderAdvertList} from './card.js';
import {showAlert} from './utils.js';
import {filtersElements} from './filters.js';
import {debounce, RERENDER_DELAY} from './utils/debounce.js';


getData(
  (adverts) => {
    renderAdvertList(adverts);
    filtersElements(debounce(() => renderAdvertList(adverts), RERENDER_DELAY));
  },
  () => showAlert(' Не удалось получить данные с сервера. Попробуйте ещё раз '),
);
