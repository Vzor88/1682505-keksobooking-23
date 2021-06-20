import {setAdverts} from './card.js';
import {deactivateForm , activateForm, generalForm} from './activate-form.js';

if (generalForm) {
  deactivateForm();
}

setAdverts();
activateForm();
