import AbstractView from './abstract-view';

const createTripListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class TripListTemplate extends AbstractView {

  get template() {
    return createTripListTemplate();
  }
}
