const resetForm = document.querySelector('.ad-form__reset');
const entryFieldTitle = document.querySelector('#title');
const entryFieldPrice = document.querySelector('#price');
const entryFieldType = document.querySelector('#type');
const fieldRooms = document.querySelector('#room_number');
const fieldCapacity = document.querySelector('#capacity');
const fieldTimeIn = document.querySelector('#timein');
const fieldTimeOut = document.querySelector('#timeout');
const parentCapacity = document.querySelector('.ad-form__element--capacity');
const selectsList = document.querySelectorAll('.map__filter');
const checkboxesList = document.querySelectorAll('.map__checkbox');
let minPrice = 1000;

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 1000000;

function isResetFilters(arraySelects, arrayCheckboxes) {
  arraySelects.forEach((item) => item.options[0].selected = true);
  arrayCheckboxes.forEach((item) => item.checked = false);
}

function determinationMinPrice(typeProperty) {
  if(typeProperty === 'bungalow') {
    entryFieldPrice.setAttribute('placeholder','больше 0');
    minPrice = 0;
  } else if(typeProperty === 'flat') {
    entryFieldPrice.setAttribute('placeholder','1000');
    minPrice = 1000;
  } else if(typeProperty === 'hotel') {
    entryFieldPrice.setAttribute('placeholder','3000');
    minPrice = 3000;
  } else if(typeProperty === 'house') {
    entryFieldPrice.setAttribute('placeholder','5000');
    minPrice = 5000;
  } else if(typeProperty === 'palace') {
    entryFieldPrice.setAttribute('placeholder','10000');
    minPrice = 10000;
  }
  return minPrice;
}

resetForm.addEventListener('click', () => {
  entryFieldTitle.textContent = ' ';
  isResetFilters(selectsList, checkboxesList);
});

entryFieldTitle.addEventListener('input', () => {
  const valueLength = entryFieldTitle.value.length;
  if (valueLength < MIN_LENGTH_TITLE) {
    entryFieldTitle.setCustomValidity(`Ещё необходимо ${MIN_LENGTH_TITLE - valueLength } символов`);
  } else if (valueLength > MAX_LENGTH_TITLE) {
    entryFieldTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_LENGTH_TITLE} символов`);
  } else {
    entryFieldTitle.setCustomValidity('');
  }
  entryFieldTitle.reportValidity();
});

entryFieldType.addEventListener('change',() => {
  determinationMinPrice(entryFieldType.value);
});

entryFieldPrice.addEventListener('input', () => {
  const valuePrice = entryFieldPrice.value;
  if(valuePrice > MAX_PRICE) {
    entryFieldPrice.setCustomValidity(`Цена должна быть меньше на ${valuePrice - MAX_PRICE}`);
  } else if (valuePrice < determinationMinPrice(entryFieldType.value)) {
    entryFieldPrice.setCustomValidity(`Цена должна быть больше на ${determinationMinPrice(entryFieldType.value) - valuePrice}`);
  } else {
    entryFieldPrice.setCustomValidity('');
  }
  entryFieldPrice.reportValidity();
});

fieldTimeIn.addEventListener('change', () => {
  fieldTimeOut.value = fieldTimeIn.value;
});

fieldTimeOut.addEventListener('change', () => {
  fieldTimeIn.value = fieldTimeOut.value;
});


function isResetFieldCapacity(list) {  // Правильность данной функции у меня вызывают сомнения, но это единственный придуманный мной вариант,
  parentCapacity.appendChild(list);    // как сделать так чтобы выпадающий список гостей сначало полностью удалялся ,а потом добавлялась копия "целого" списка
  list.classList.add('capacity');
  document.querySelector('.capacity').remove();
  fieldCapacity.remove();
  parentCapacity.appendChild(list);
}

fieldRooms.addEventListener('change', () => {
  const newFieldCapacity = fieldCapacity.cloneNode(true);
  const listCapacity = Array.from(newFieldCapacity);
  isResetFieldCapacity(newFieldCapacity);
  if(fieldRooms.value === '1') {
    listCapacity[0].remove();
    listCapacity[1].remove();
    listCapacity[3].remove();
  } else if (fieldRooms.value === '2') {
    listCapacity[0].remove();
    listCapacity[3].remove();
  } else if (fieldRooms.value === '3') {
    listCapacity[3].remove();
  } else {
    listCapacity[0].remove();
    listCapacity[1].remove();
    listCapacity[2].remove();
  }
});

// вариант этого же события через блокировку options

// fieldRooms.addEventListener('change', () => {
//   const listCapacity = Array.from(fieldCapacity);
//   listCapacity.forEach((item) => item.removeAttribute('disabled'));
//   if(fieldRooms.value === '1') {
//     fieldCapacity.options[0].setAttribute('disabled', 'disabled');
//     fieldCapacity.options[1].setAttribute('disabled', 'disabled');
//     fieldCapacity.options[3].setAttribute('disabled', 'disabled');
//     fieldCapacity.value = 1;
//   } else if (fieldRooms.value === '2') {
//     fieldCapacity.options[0].setAttribute('disabled', 'disabled');
//     fieldCapacity.options[3].setAttribute('disabled', 'disabled');
//     fieldCapacity.value = 2;
//   } else if (fieldRooms.value === '3') {
//     fieldCapacity.options[3].setAttribute('disabled', 'disabled');
//     fieldCapacity.value = 3;
//   } else {
//     fieldCapacity.options[0].setAttribute('disabled', 'disabled');
//     fieldCapacity.options[1].setAttribute('disabled', 'disabled');
//     fieldCapacity.options[2].setAttribute('disabled', 'disabled');
//     fieldCapacity.value = 0;
//   }
// });
