import SiteFilterView from './../view/site-sort-view';
import TripListTemplate from './../view/trip-list-view';
import PointPresenter from './../presenter/point-presenter';
import { remove, render, RenderPosition, updateItem } from './../utils/render';
import EmptyListTemplate from './../view/list-empty-view';
import SiteCreateTemplate from './../view/site-create-view';
import { destinationData } from './../utils/destination';


export default class TripPresenter {
  #tripContainer = null;

  #filterComponent = new SiteFilterView();
  #tripListComponent = new TripListTemplate();
  #emptyListComponent = new EmptyListTemplate();
  #createPointComponent = new SiteCreateTemplate(destinationData[0]);

  #sitePointListElements = document.querySelector('.trip-events');

  #tripPoints = [];
  #pointPresenter = new Map();

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    this.#createPointComponent.setEventCreateButton(this.#newPointClickHandler);

    render(this.#sitePointListElements, this.#filterComponent, RenderPosition.BEFOREEND);
    render(this.#sitePointListElements, this.#tripListComponent, RenderPosition.BEFOREEND);

    if (this.#tripPoints.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderPoints();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
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

  // #renderNewPoint = () => {
  //   render(this.#tripListComponent, this.#createPointComponent, RenderPosition.AFTERBEGIN);
  // }

  // #replaceTripToCreatePoint = () => {
  //   replace(this.#renderNewPoint, this.#renderPoints);
  // }

  #newPointClickHandler = () => {
    // this.#replaceTripToCreatePoint();
    remove(this.#tripListComponent);
    render(this.#sitePointListElements, this.#createPointComponent, RenderPosition.BEFOREEND);

  }
}
