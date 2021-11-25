import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createSiteFilterTemplate } from './view/site-filter-view.js';
import { createSiteSortTemplate } from './view/site-sort-view.js';
import { createSiteModifyTemplate } from './view/site-modify-view.js';
import { createSiteCreateTemplate } from './view/site-create-view.js';
import { createSitePointTemplate } from './view/site-point-template.js';
import { renderTemplate, RenderPosition } from './render.js';
const TASK_COUNT = 3;

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderMenu = siteHeaderElement.querySelector('.trip-controls__navigation');

renderTemplate(siteHeaderMenu, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const siteHeaderFilter = siteHeaderElement.querySelector('.trip-controls__filters');

renderTemplate(siteHeaderFilter, createSiteFilterTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.page-main');
const siteMainSort = siteMainElement.querySelector('.trip-events');

renderTemplate(siteMainSort, createSiteSortTemplate(), RenderPosition.BEFOREEND);

renderTemplate(siteMainSort, createSiteModifyTemplate(), RenderPosition.BEFOREEND);

renderTemplate(siteMainSort, createSiteCreateTemplate(), RenderPosition.BEFOREEND);


const createTripList = (() => {

  const pointFragment = document.createDocumentFragment();
  const createSitePointWrapper = document.createElement('ul');
  createSitePointWrapper.classList.add('trip-events__list');
  pointFragment.appendChild(createSitePointWrapper);
  siteMainSort.appendChild(pointFragment);

  for (let i = 0; i < TASK_COUNT; i++) {
    renderTemplate(createSitePointWrapper, createSitePointTemplate(), RenderPosition.BEFOREEND);
  }

})();
