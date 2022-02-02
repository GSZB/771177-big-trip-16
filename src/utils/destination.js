
import { DESTINATION_INFO, MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL, TYPE_OF_TRIP, CITIES, OFFERS, MAXIMUM_RANDOM_BIG, MAXIMUM_PRICE_NUMBER, DESTINATION_COUNT } from '../mock/data.js';
import dayjs from 'dayjs';
import { getRandomInt, getRandomArrayElement } from './random.js';
import { nanoid } from 'nanoid';


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
  id: nanoid(),
  title: getRandomArrayElement(OFFERS),
  price: generatePrice(),
});


const getOffers = () => [...new Set(Array.from({length: getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL)}, () => getOffer()))];

const randomOffers = () => {
  const randomOffersArray = [];
  TYPE_OF_TRIP.forEach((trip) => {
    randomOffersArray.push({
      type: trip,
      offers: getOffers()
    });
  });
  return randomOffersArray;
};

const getRandomDestinationData = () => {
  const randomDestinationArray = [];
  CITIES.forEach((city) => {
    randomDestinationArray.push({
      name: city,
      text: getDestinationDescription(),
      pictures: getAmountOfGeneratedPhotos()
    });
  });
  return randomDestinationArray;
};

const generateDate = () => {
  const maxDaysGap = 7;

  const daysGap = getRandomInt(MINIMAL_RANDOM_NUMBER, maxDaysGap);

  return dayjs().add(daysGap, 'day').format('MMM DD');
};

const createMockData = () => ({
  id: nanoid(),
  basePrice: generatePrice(),
  dateFrom: generateDate(),
  dateTo: generateDate(),
  destination: getDestinationInfo(),
  currentOfferIds: [],
  isFavorite: Boolean(getRandomInt(0, 1)),
  type: getTypeOfTheTrip(),
  offers: randomOffers(),
});

const getDestinationData = () => Array.from({length: DESTINATION_COUNT}, createMockData);
const destinationData = getDestinationData();
const randomDestinationData = getRandomDestinationData();

export { destinationData, getRandomCity, getAmountOfGeneratedPhotos, randomDestinationData };

