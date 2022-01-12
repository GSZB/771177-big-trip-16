import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createSiteFilterTemplate } from './view/site-filter-view.js';
import { createSiteSortTemplate } from './view/site-sort-view.js';
import { createSiteModifyTemplate } from './view/site-modify-view.js';
import { createSiteCreateTemplate } from './view/site-create-view.js';
import { createSitePointTemplate } from './view/site-point-template.js';
import { renderTemplate, RenderPosition } from './render.js';
import { getTypeOfTheTrip, getRandomCity, getOffers, getDestinationInfo, dueTime } from './mock/utils.js';
import { DESTINATION_COUNT } from './mock/data.js';

const createMockData = () => ({
  type: getTypeOfTheTrip(),
  city: getRandomCity(),
  offers: getOffers(),
  info: getDestinationInfo(),
  time: dueTime,
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

renderTemplate(siteMainSort, createSiteModifyTemplate(destinationData[1]), RenderPosition.BEFOREEND);

renderTemplate(siteMainSort, createSiteCreateTemplate(destinationData[2]), RenderPosition.BEFOREEND);

const generatePage = () => {
  // const TASK_COUNT = 3;

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
