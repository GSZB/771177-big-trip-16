import AbstractView from './abstract-view';

const createTripContainer = () => (
  `<section class="trip-events">
  </section>`
);

export default class TripContainerView extends AbstractView {

  get template() {
    return createTripContainer();
  }
}
