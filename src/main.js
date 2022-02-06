import SiteMenuControlView  from './view/site-menu-controls-view';
import SiteMenuInfoView from './view/site-menu-info-view';
import HeaderFilterView from './view/site-filter-view';
import TripListTemplate from './view/trip-list-view';
import { render, RenderPosition } from './utils/render';
import { destinationData } from './utils/destination';
import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/points-model';
import FilterModel from './model/filter-model';

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

const filterModel = new FilterModel();

const pointModel = new PointModel();
pointModel.points = destinationData;


const tripPresenter = new TripPresenter(TripListComponent, pointModel);
tripPresenter.init();

