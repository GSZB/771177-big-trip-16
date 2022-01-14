import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createSiteFilterTemplate } from './view/site-filter-view.js';
import { createSiteSortTemplate } from './view/site-sort-view.js';
import { createSiteModifyTemplate } from './view/site-modify-view.js';
import { createSiteCreateTemplate } from './view/site-create-view.js';
import { createSitePointTemplate } from './view/site-point-template.js';
import { renderTemplate, RenderPosition } from './render.js';
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

renderTemplate(siteHeaderMenu, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const siteHeaderFilter = siteHeaderElement.querySelector('.trip-controls__filters');

renderTemplate(siteHeaderFilter, createSiteFilterTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.page-main');
const siteMainSort = siteMainElement.querySelector('.trip-events');

renderTemplate(siteMainSort, createSiteSortTemplate(), RenderPosition.BEFOREEND);

renderTemplate(siteMainSort, createSiteModifyTemplate(destinationData[0]), RenderPosition.BEFOREEND);

renderTemplate(siteMainSort, createSiteCreateTemplate(destinationData[1]), RenderPosition.BEFOREEND);

const generatePage = () => {

  const pointFragment = document.createDocumentFragment();
  const createSiteWaypointWrapper = document.createElement('ul');
  createSiteWaypointWrapper.classList.add('trip-events__list');
  pointFragment.appendChild(createSiteWaypointWrapper);
  siteMainSort.appendChild(pointFragment);

  for (let i = 0; i < DESTINATION_COUNT; i++) {
    renderTemplate(createSiteWaypointWrapper, createSitePointTemplate(destinationData[i]), RenderPosition.BEFOREEND);
  }

};


generatePage();

export {createMockData};
