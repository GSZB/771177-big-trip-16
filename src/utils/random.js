// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomInt(min, max) {
  if (min >= max) {

    throw new ReferenceError('Минимальное значение не может превышать максимальное');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Функция, возвращяющая случайный элемент с массива

function getRandomArrayElement(elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}
export {getRandomInt, getRandomArrayElement};
