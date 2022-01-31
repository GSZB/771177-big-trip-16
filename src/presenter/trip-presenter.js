import SiteFilterView from './../view/site-filter-view';
import TripListTemplate from './../view/trip-list-view';
import PointPresenter from './../presenter/point-presenter';
import { render, RenderPosition, updateItem } from './../utils/render';
import EmptyListTemplate from './../view/list-empty-view';
import SiteCreateTemplate from './../view/site-create-view';
import { destinationData } from './../utils/destination';
import SiteSortView from './../view/site-sort-view';
import { SortType } from '../mock/data';

export default class TripPresenter {
  #tripContainer = null;

  #filterComponent = new SiteFilterView();
  #tripListComponent = new TripListTemplate();
  #emptyListComponent = new EmptyListTemplate();
  #createPointComponent = new SiteCreateTemplate(destinationData[0]);
  #siteSortComponent = new SiteSortView();

  #sitePointListElements = document.querySelector('.trip-events');

  #tripPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedTripPoints = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];
    this.#sourcedTripPoints = [...tripPoints];

    this.#createPointComponent.setEventCreateButton(this.#newPointClickHandler);

    render(this.#sitePointListElements, this.#tripListComponent, RenderPosition.BEFOREEND);

    if (this.#tripPoints.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  // #sortPoints = (sortType) => {

  //   switch (sortType) {
  //     case SortType.TIME:
  //       this.#tripPoints.sort(sortTaskUp);
  //       break;
  //     case SortType.PRICE:
  //       this.#tripPoints.sort(sortTaskDown);
  //       break;
  //     default:
  //       this.#tripPoints = [...this.#sourcedTripPoints];
  //   }

  //   this.#currentSortType = sortType;
  // }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    // this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  }

  #renderPointSort = () => {
    render(this.#sitePointListElements, this.#siteSortComponent, RenderPosition.AFTERBEGIN);
    this.#siteSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#tripPoints.forEach((tripPoint) => this.#renderPoint(tripPoint));
  }

  #renderNoPoints = () => {
    render(this.#tripListComponent, this.#emptyListComponent, RenderPosition.AFTERBEGIN);
  }

  #clearPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #newPointClickHandler = () => {
    render(this.#tripListComponent, this.#createPointComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTrip = () => {
    this.#renderPointSort();
    this.#renderPoints();
  }
}
