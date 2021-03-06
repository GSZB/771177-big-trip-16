import AbstractView from './abstract-view';

const createSitePointTemplate = (point) => {
  const {type, destination, offers, isFavorite} = point;
  const currentOffer = offers.find((offerData) => offerData.type === type) || {offers: [{price: 100, title: 'Order Uber'}]};

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">MAR 18</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
      </p>
      <p class="event__duration">30M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${currentOffer.offers[0].price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
        <span class="event__offer-title">${`${currentOffer.offers[0].title  }&nbsp;&plus;&euro;&nbsp;${currentOffer.offers[0].price}`}</span>
        <!-- &plus;&euro;&nbsp;
        <span class="event__offer-price">20</span>-->
      </li>
    </ul>
    <button class="event__favorite-btn ${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};


export default class SitePointTemplate extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createSitePointTemplate(this.#point);
  }

  setEventRolldownButton = (callback) => {
    this._callback.rolldownClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickEventRolldownButton);
  }

  #clickEventRolldownButton = (evt) => {
    evt.preventDefault();
    this._callback.rolldownClick();
  }

  setEventFavoriteButton = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#clickEventFavoriteButton);
  }

  #clickEventFavoriteButton = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
