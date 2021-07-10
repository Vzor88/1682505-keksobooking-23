import {getData} from './api.js';
import {renderAdvertList} from './card.js';
import {showAlert, setDebounce} from './utils.js';
import {getFiltersElements} from './filters.js';
import {filtersFormArray, getAttributeRemoveDisabled} from './activate-form.js';

const loadAdvert = () => {
  getData(
    (adverts) => {
      renderAdvertList (adverts);
      getFiltersElements (setDebounce (() => renderAdvertList (adverts)));
      getAttributeRemoveDisabled(filtersFormArray);
    },
    () => showAlert (' Не удалось получить данные с сервера. Попробуйте ещё раз '),
  );
};

loadAdvert();
export {loadAdvert};
