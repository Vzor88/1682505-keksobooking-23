import {getData} from './api.js';
import {renderAdvertList} from './card.js';
import {showAlert, getDebounce} from './utils.js';
import {getFiltersElements} from './filters.js';
import {filtersFormArray, getAttributeRemoveDisabled} from './activate-form.js';

const RERENDER_DELAY = 500;

const loadAdvert = () => {
  getData(
    (adverts) => {
      renderAdvertList (adverts);
      getFiltersElements (getDebounce (() => renderAdvertList (adverts), RERENDER_DELAY));
      getAttributeRemoveDisabled(filtersFormArray);
    },
    () => showAlert (' Не удалось получить данные с сервера. Попробуйте ещё раз '),
  );
};

loadAdvert();
export {loadAdvert};
