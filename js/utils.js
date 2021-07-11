const DEFAULT_DELAY = 500;

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const setDebounce = (callback, timeoutDelay = DEFAULT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5 ) ? number % 10 : 5]];
}

export {setDebounce, isEscEvent, declOfNum};
