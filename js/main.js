import {setAdverts} from './card.js';
import {deactivate , activate, generalForm} from './activate.js';

if (generalForm) {
  deactivate();
}

setAdverts();
activate();
