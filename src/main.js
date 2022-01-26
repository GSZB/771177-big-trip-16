import SiteMenuControlView  from './view/site-menu-controls-view.js';
import SiteMenuInfoView from './view/site-menu-info-view.js';
import HeaderFilterView from './view/site-filter-view.js';
import TripListTemplate from './view/trip-list-view';
import { render, RenderPosition } from './utils/render.js';
import { destinationData } from './utils/destination.js';
import TripPresenter from './presenter/trip-presenter';

const SiteMenuInfoComponent = new SiteMenuInfoView();
const SiteMenuControlComponent = new SiteMenuControlView();
const HeaderFilterComponent = new HeaderFilterView();
const TripListComponent = new TripListTemplate();

const siteHeaderContainerMenu = document.querySelector('.trip-main');
render(siteHeaderContainerMenu, SiteMenuInfoComponent, RenderPosition.AFTERBEGIN);
const siteControlNavigationElement = siteHeaderContainerMenu.querySelector('.trip-controls__navigation');
render(siteControlNavigationElement, SiteMenuControlComponent, RenderPosition.BEFOREEND);
const siteControlFilterElement = siteHeaderContainerMenu.querySelector('.trip-controls__filters');
render(siteControlFilterElement, HeaderFilterComponent, RenderPosition.BEFOREEND);


const tripPresenter = new TripPresenter(TripListComponent);
tripPresenter.init(destinationData);

