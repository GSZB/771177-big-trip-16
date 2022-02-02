import SiteFilterView from './../view/site-filter-view';
import TripListTemplate from './../view/trip-list-view';
import PointPresenter from './../presenter/point-presenter';
import { render, RenderPosition } from './../utils/render';
import EmptyListTemplate from './../view/list-empty-view';
import SiteCreateTemplate from './../view/site-create-view';
import { destinationData } from './../utils/destination';
import SiteSortView from './../view/site-sort-view';
import { SortType } from '../mock/data';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #filterComponent = new SiteFilterView();
  #tripListComponent = new TripListTemplate();
  #emptyListComponent = new EmptyListTemplate();
  #createPointComponent = new SiteCreateTemplate(destinationData[0]);
  #siteSortComponent = new SiteSortView();

  #sitePointListElements = document.querySelector('.trip-events');

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;

    // this.#pointsModel.addObserver(this.#handleModelEvent);
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

    if (this.#pointsModel.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderTrip();
  }

  // #handleViewAction = (actionType, updateType, update) => {
  //   console.log(actionType, updateType, update);
  //   // Здесь будем вызывать обновление модели.
  //   // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
  //   // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
  //   // update - обновленные данные
  // }

  // #handleModelEvent = (updateType, data) => {
  //   console.log(updateType, data);
  //   // В зависимости от типа изменений решаем, что делать:
  //   // - обновить часть списка (например, когда поменялось описание)
  //   // - обновить список (например, когда задача ушла в архив)
  //   // - обновить всю доску (например, при переключении фильтра)
  // }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
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
    render(this.#sitePointListElements, this.#siteSortComponent, RenderPosition.AFTERBEGIN);
    this.#siteSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
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
