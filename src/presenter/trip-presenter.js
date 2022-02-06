import SiteFilterView from './../view/site-filter-view';
import TripListTemplate from './../view/trip-list-view';
import PointPresenter from './../presenter/point-presenter';
import { render, RenderPosition } from './../utils/render';
import EmptyListTemplate from './../view/list-empty-view';
import SiteCreateTemplate from './../view/site-create-view';
import { destinationData } from './../utils/destination';
import SiteSortView from './../view/site-sort-view';
import { SortType } from '../mock/data';
import { UserAction, UpdateType } from '../mock/data';
export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #filterComponent = new SiteFilterView();
  #tripListComponent = new TripListTemplate();
  #emptyListComponent = new EmptyListTemplate();
  #createPointComponent = new SiteCreateTemplate(destinationData[0]);
  #siteSortComponent = null;


  #sitePointListElements = document.querySelector('.trip-events');

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return this.#pointsModel.points.sort((a, b) => a.dateFrom - b.dateFrom);
      case SortType.PRICE:
        return this.#pointsModel.points.sort((a, b) => b.basePrice - a.basePrice);
    }

    return this.#pointsModel.points;
  }

  init = () => {

    this.#createPointComponent.setEventCreateButton(this.#newPointClickHandler);

    render(this.#sitePointListElements, this.#tripListComponent, RenderPosition.BEFOREEND);

    this.#renderTrip();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        break;
    }
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  }

  #renderPointSort = () => {
    this.#siteSortComponent = new SiteSortView(this.#currentSortType);
    this.#siteSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#tripListComponent, this.#siteSortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    if (!this.#pointsModel.points.length === 0) {
      this.#renderNoPoints();
    }

    this.points.forEach((point) => this.#renderPoint(point));
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
