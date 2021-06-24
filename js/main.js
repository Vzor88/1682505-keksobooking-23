import {setAdverts} from './card.js';
import './form.js';
import {deactivateForm , activateForm, generalForm} from './activate-form.js';

if (generalForm) {
  deactivateForm();
}

setAdverts();
activateForm();
