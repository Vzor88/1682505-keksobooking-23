function getRandInt(minNumber, maxNumber) {
  if(minNumber < 0 || maxNumber <= minNumber) {
    return 'Неправильно введены данные: допускается использование любого целого положительного числа больше 0, а так же "до" должно быть больше "от"';
  }
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) ) + minNumber;
}

getRandInt(1, 10);

function getRandFloat(minNumber, maxNumber, float) {
  if(minNumber < 0 || maxNumber <= minNumber) {
    return 'Неправильно введены данные: допускается использование любого положительного числа больше 0, а так же "до" должно быть больше "от"';
  }
  return Number((Math.random() * (maxNumber - minNumber + 1) + minNumber).toFixed(float));
}

getRandFloat(1, 10, 2);

