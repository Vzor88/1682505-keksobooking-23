const filtersForm = document.querySelector('.map__filters');
const generalForm = document.querySelector('.ad-form');
const elementsForm = generalForm.querySelectorAll('fieldset');
const filtersFormArray = Array.from(filtersForm.children);

const getAttributeAddDisabled = (array) => {
  array.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const getAttributeRemoveDisabled = (array) => {
  array.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const deactivateForm = () => {
  generalForm.classList.add('ad-form__disabled');
  filtersForm.classList.add('ad-form__disabled');
  getAttributeAddDisabled(filtersFormArray);
  getAttributeAddDisabled(elementsForm);
};

const activateForm = () => {
  getAttributeRemoveDisabled(elementsForm);
  generalForm.classList.remove('ad-form__disabled');
  filtersForm.classList.remove('ad-form__disabled');
};

if (generalForm) {
  deactivateForm();
}

export {activateForm, getAttributeRemoveDisabled, filtersFormArray};
