import { getRandomArrayElement } from './utils';
const MINIMAL_RANDOM_NUMBER = 0;
const MAXIMUM_RANDOM_SMALL = 5;
const MAXIMUM_RANDOM_BIG = 100;
const DESTINATION_COUNT = 15;
const TYPE_OF_TRIP = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const CITIES = ['Amsterdam', 'Rio de Janeiro', 'Tokyo'];
const FLYGHT_OFFERS = ['Add luggage +€  50', 'Switch to comfort +€  80'];
const SIGHTSEEING_OFFER = ['Book tickets +€  40', 'Lunch in city +€  30'];
const getFlygthOffer = () => [...new Set(Array.from({length: Math.floor(Math.random() * (FLYGHT_OFFERS.length + 1))}, () => getRandomArrayElement(FLYGHT_OFFERS)))];
const getSightseeingOffer = () => [...new Set(Array.from({length: Math.floor(Math.random() * (SIGHTSEEING_OFFER.length + 1))}, () => getRandomArrayElement(SIGHTSEEING_OFFER)))];

const OFFERS = {
  Taxi: 'Order Uber +€  20', //Можно формировать цену в зависимости от того, какой город выбран
  Flight: getFlygthOffer(),
  Drive : 'Rent a car +€  200',
  'Check-in': 'Add breakfast +€  50',
  Sightseeing: getSightseeingOffer(),
};
const DESTINATION_INFO = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

export { MINIMAL_RANDOM_NUMBER, CITIES, OFFERS, MAXIMUM_RANDOM_BIG, MAXIMUM_RANDOM_SMALL, DESTINATION_INFO, TYPE_OF_TRIP, DESTINATION_COUNT };
