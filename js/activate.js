const filtersForm = document.querySelector('.map__filters');
const generalForm = document.querySelector('.ad-form');
const elementsForm = generalForm.querySelectorAll('fieldset');
const filtersFormElements = filtersForm.children;
const filtersFormArray = Array.from(filtersFormElements);

function getAttributeAddDisabled(array) {
  array.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

function getAttributeRemoveDisabled(array) {
  array.forEach((element) => {
    element.removeAttribute('disabled');
  });
}

function deactivate(){
  generalForm.classList.add('ad-form--disabled');
  filtersForm.classList.add('ad-form--disabled');
  getAttributeAddDisabled(filtersFormArray);
  getAttributeAddDisabled(elementsForm);
}

function activate(){
  generalForm.classList.remove('ad-form--disabled');
  filtersForm.classList.remove('ad-form--disabled');
  getAttributeRemoveDisabled(filtersFormArray);
  getAttributeRemoveDisabled(elementsForm);
}

export {deactivate, activate, generalForm};
