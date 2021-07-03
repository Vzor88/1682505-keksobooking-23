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

function deactivateForm(){
  getAttributeAddDisabled(filtersFormArray);
  getAttributeAddDisabled(elementsForm);
}

function activateForm(){
  getAttributeRemoveDisabled(elementsForm);
}

if (generalForm) {
  deactivateForm();
}

export {activateForm, getAttributeRemoveDisabled, filtersFormArray};
