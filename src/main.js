import SiteMenuView  from './view/site-menu-view.js';
import SiteFilterView from './view/site-filter-view.js';
import SiteSortView from './view/site-sort-view.js';
import SiteeditTemplate from './view/site-modify-view.js';
import SitePointTemplate from './view/site-point-template.js';
import SiteCreateTemplate from './view/site-create-view.js';
import { render, RenderPosition } from './render.js';
import { getTypeOfTheTrip, getOffers, getDestinationInfo, generatePrice, generateDate, getRandomInt } from './mock/utils.js';
import { DESTINATION_COUNT, MAXIMUM_RANDOM_SMALL, MINIMAL_RANDOM_NUMBER } from './mock/data.js';


const createMockData = () => ({
  basePrice: generatePrice(),
  dateFrom: generateDate(),
  dateTo: generateDate(),
  destination: getDestinationInfo(),
  id: getRandomInt(MINIMAL_RANDOM_NUMBER, MAXIMUM_RANDOM_SMALL),
  isFavorite: Boolean(getRandomInt(0, 1)),
  type: getTypeOfTheTrip(),
  offers: getOffers(),
});

const getDestinationData = () => Array.from({length: DESTINATION_COUNT}, createMockData);

const destinationData = getDestinationData();

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderMenu = siteHeaderElement.querySelector('.trip-controls__navigation');

render(siteHeaderMenu, new SiteMenuView().element, RenderPosition.BEFOREEND);

const siteHeaderFilter = siteHeaderElement.querySelector('.trip-controls__filters');

render(siteHeaderFilter, new SiteFilterView().element, RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.page-main');
const siteMainSort = siteMainElement.querySelector('.trip-events');

render(siteMainSort, new SiteSortView().element, RenderPosition.BEFOREEND);


const generatePage = () => {

  const pointFragment = document.createDocumentFragment();
  const createSiteWaypointWrapper = document.createElement('ul');
  createSiteWaypointWrapper.classList.add('trip-events__list');
  pointFragment.appendChild(createSiteWaypointWrapper);
  siteMainSort.appendChild(pointFragment);

  for (let i = 0; i < DESTINATION_COUNT; i++) {
    const editPiontComponent = new SiteeditTemplate(destinationData[i]);
    const pointComponent = new SitePointTemplate(destinationData[i]);
    let isOpen = false;

    const replacePointToForm = () => {
      createSiteWaypointWrapper.replaceChild(editPiontComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      createSiteWaypointWrapper.replaceChild(pointComponent.element, editPiontComponent.element);
    };

    const toggle = () => {
      if (isOpen) {
        replaceFormToPoint();
      } else {
        replacePointToForm();
      }

      isOpen = !isOpen;
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        toggle();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    editPiontComponent.setEditSubmitHandler((evt) => {
      evt.preventDefault();
      toggle();
    });

    pointComponent.setEventRolldownButton(() => {
      toggle();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPiontComponent.setEventRollupButton(() => {
      toggle();
    });


    render(createSiteWaypointWrapper, pointComponent.element, RenderPosition.BEFOREEND);
  }

  siteHeaderElement.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
    createSiteWaypointWrapper.innerHTML = '';
    render(createSiteWaypointWrapper, new SiteCreateTemplate(destinationData[0]).element, RenderPosition.BEFOREEND);
  });

};

generatePage();


export {createMockData};
