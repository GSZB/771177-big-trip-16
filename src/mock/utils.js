
import { DESTINATION_INFO, MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL, TYPE_OF_TRIP, CITIES, OFFERS, MAXIMUM_RANDOM_BIG, MAXIMUM_PRICE_NUMBER } from './data.js';
import dayjs from 'dayjs';

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

//Функции возвращающие случайные элементы для склеивания описания

const getDestinationDescription = () => [...new Set(Array.from({length: getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL)}, () => getRandomArrayElement(DESTINATION_INFO)))];

const getRandomCity = () => (getRandomArrayElement(CITIES));

const generatePhotos = () => ({
  photoLink: `http://picsum.photos/248/152?r=${ getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_BIG) }`,
  description: 'Static City Description',
});

const getAmountOfGeneratedPhotos = () => [...new Set(Array.from({length: getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL)}, () => generatePhotos()))];

const getDestinationInfo = () => ({
  text: getDestinationDescription(),
  name: getRandomCity(),
  pictures: getAmountOfGeneratedPhotos(),
});

//Функции возвращающие случайные элементы для склеивания дополнительных опций

const getTypeOfTheTrip = () => (getRandomArrayElement(TYPE_OF_TRIP));

const generatePrice = () => getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_PRICE_NUMBER);

const getOffer = () => ({
  id: getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL),
  title: getRandomArrayElement(OFFERS),
  price: generatePrice(),
});

const getOffers = () => [...new Set(Array.from({length: getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL)}, () => getOffer()))];

//Dayjs

const generateDate = () => {
  const maxDaysGap = 7;

  const daysGap = getRandomInt(MINIMAL_RANDOM_NUMBER, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

export { getRandomInt, getRandomArrayElement, getTypeOfTheTrip, getRandomCity, getDestinationInfo, getAmountOfGeneratedPhotos, getOffers, generatePrice, generateDate };
