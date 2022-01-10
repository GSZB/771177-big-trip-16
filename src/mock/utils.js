import { DESTINATION_INFO, MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL, TYPE_OF_TRIP, CITIES, OFFERS, MAXIMUM_RANDOM_BIG } from './data.js';

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

//Функции возвращающие случайные элементы для склеивания

const getTypeOfTheTrip = () => (getRandomArrayElement(TYPE_OF_TRIP));

const getRandomCity = () => (getRandomArrayElement(CITIES));

const offerKeys = Object.values(OFFERS);

const getOffers = () => [...new Set(Array.from({length: getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL)}, () => getRandomArrayElement(offerKeys)))];

const getDestinationDescription = () => [...new Set(Array.from({length: getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL)}, () => getRandomArrayElement(DESTINATION_INFO)))];

const getAmountOfGeneratedPhotos = function () {
  const photoLinks = [];
  for (let i = 0; i < getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL); i++) {
    const generatePhotos = () => {
      const photoLink = `http://picsum.photos/248/152?r=${ getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_BIG) }`;
      photoLinks.push(photoLink);
    };

    generatePhotos();
  }

  return photoLinks;
};

const getDestinationInfo = () => ({
  description: getDestinationDescription(),
  photos: getAmountOfGeneratedPhotos(),
});

const dueTime = 'static time DD HH MM';


export { getRandomInt, getRandomArrayElement, getTypeOfTheTrip, getRandomCity, getDestinationInfo, getAmountOfGeneratedPhotos, getOffers, dueTime };
