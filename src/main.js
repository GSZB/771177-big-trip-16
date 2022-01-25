import SiteMenuControlView  from './view/site-menu-controls-view.js';
import SiteMenuInfoView from './view/site-menu-info-view.js';
import SiteFilterView from './view/site-filter-view.js';
import SiteSortView from './view/site-sort-view.js';
import SiteCreateTemplate from './view/site-create-view.js';
import TripListTemplate from './view/trip-list-view';
import { render, RenderPosition } from './utils/render.js';
import { destinationData } from './utils/destination.js';
import { DESTINATION_COUNT } from './mock/data.js';
import PointPresenter from './presenter/point-presenter';

const SiteMenuInfoComponent = new SiteMenuInfoView();
const SiteMenuControlComponent = new SiteMenuControlView();
const SiteFilterComponent = new SiteFilterView();
const SiteSortComponent = new SiteSortView();
const TripListComponent = new TripListTemplate();

const siteHeaderContainerMenu = document.querySelector('.trip-main');
render(siteHeaderContainerMenu, SiteMenuInfoComponent, RenderPosition.AFTERBEGIN);
const siteControlNavigationElement = siteHeaderContainerMenu.querySelector('.trip-controls__navigation');
render(siteControlNavigationElement, SiteMenuControlComponent, RenderPosition.BEFOREEND);
const siteControlFilterElement = siteHeaderContainerMenu.querySelector('.trip-controls__filters');
render(siteControlFilterElement, SiteFilterComponent, RenderPosition.BEFOREEND);

const sitePointListElements = document.querySelector('.trip-events');


const generatePoints = () => {
  render(sitePointListElements, SiteSortComponent, RenderPosition.BEFOREEND);
  render(sitePointListElements, TripListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < DESTINATION_COUNT; i++) {

    const pointPresenter = new PointPresenter(TripListComponent);
    pointPresenter.init(destinationData[i]);
  }

  const SiteCreateComponent = new SiteCreateTemplate(destinationData[0]);

  document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
    render(TripListComponent, SiteCreateComponent, RenderPosition.BEFOREEND);
  });
};


generatePoints();

