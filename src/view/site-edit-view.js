import {TYPE_OF_TRIP, CITIES} from './../mock/data';
import SmartView from './smart-view';
import {randomDestinationData} from './../utils/destination';

const createSiteEditTemplate = (point) => {
  const {destination, type, offers, currentOfferIds = [], basePrice} = point;
  const currentOffer = offers.find((offerData) => offerData.type.toLowerCase() === type.toLowerCase()) || {offers: []};
  const currentDestination = randomDestinationData.find((destinationData) => destinationData.name.toLowerCase() === destination.name.toLowerCase()) || {offers: []};

  return `<li><form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${TYPE_OF_TRIP.map((tripType) => {
    const lowerType = tripType.toLowerCase();

    return `
              <div class="event__type-item">
                <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerType}" ${lowerType === type.toLowerCase() ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${tripType}</label>
              </div>
            `;
  }).join('')}

        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-1">${type}</label>
      <input class="event__input  event__input--destination" id="event-destination-1" value="${destination?.name || ''}" name="event-destination" list="destination-list-1" />
      <datalist id="destination-list-1">
        ${CITIES.map((city) => `<option value="${city}"></option>`).join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${currentOffer.offers.map((offer) => `
          <div class="event__offer-selector">
            <input value="${offer.id}" ${currentOfferIds.includes(offer.id) ? 'checked' : ''} class="event__offer-checkbox visually-hidden" id="event-offer-${offer.title.replace(/ /g, '')}-${offer.id}" type="checkbox" name="event-offer-${offer.title.replace(/ /g, '')}-${offer.id}">
            <label class="event__offer-label" for="event-offer-${offer.title.replace(/ /g, '')}-${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
          `).join('')}
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDestination.text}</p>
    </section>
  </section>
</form></li>`;
};

export default class SiteEditTemplate extends SmartView {
  constructor(point) {
    super();
    this._data = SiteEditTemplate.parsePointToData(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createSiteEditTemplate(this._data);
  }

  setEditSubmitHandler = (callback) => {
    this._callback.editSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#editSubmitHandler);
  }

  #editSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.editSubmit(this._data);
  }

  setEventRollupButton = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#eventRollupButton);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #eventRollupButton = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(SiteEditTemplate.parseDataToPoint(this._data));
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__type-input').forEach((eventTypeInput) => {
      eventTypeInput.addEventListener('change', this.#changeTypeOfTrip);
    });
    this.element.querySelectorAll('.event__offer-checkbox').forEach((offerTypeInput) => {
      offerTypeInput.addEventListener('change', this.#changeTypeOffer);
    });
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#changeDestinationCity);
  }

  restoreHandlers = () => {
    debugger;
    this.#setInnerHandlers();
    this.setEventRollupButton(this._callback.rollupClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  #changeDestinationCity = (evt) => {
    evt.preventDefault();

    if (!CITIES.includes(evt.target.value)) {
      return;
    }

    this.updateData({
      destination: {
        name: evt.target.value
      }
    });
  }

  #changeTypeOfTrip = (evt) => {
    evt.preventDefault();

    this.updateData({
      type: evt.target.value,
      currentOfferIds: []
    });
  }

  #changeTypeOffer = (evt) => {
    evt.preventDefault();

    const currentOfferIds = [...this._data.currentOfferIds];
    const deleteCount = 1;

    if (currentOfferIds.includes(evt.target.value)) {
      currentOfferIds.splice(currentOfferIds.indexOf(evt.target.value), deleteCount);
    } else {
      currentOfferIds.push(evt.target.value);
    }

    this.updateData({
      currentOfferIds: [...currentOfferIds]
    });
  }

  static parsePointToData = (point) => ({...point,
    type: point.type
  })

  static parseDataToPoint = (data) => {
    const point = {...data};


  }
}
