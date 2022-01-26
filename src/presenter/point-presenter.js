import SiteEditTemplate from './../view/site-modify-view';
import SitePointTemplate from './../view/site-point-template';
import { remove, render, RenderPosition, replace } from './../utils/render';

export default class PointPresenter {
  #pointListContainer = null;
  #changeData = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new SitePointTemplate(point);
    this.#pointEditComponent = new SiteEditTemplate(point);

    this.#pointComponent.setEventRolldownButton(this.#handleRolldownClick);
    this.#pointEditComponent.setEventRollupButton(this.#handleRollupButton);
    this.#pointComponent.setEventFavoriteButton(this.#handleFavoriteClick);
    this.#pointEditComponent.setEditSubmitHandler(this.#handleSubmitButton);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#pointListContainer.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.element.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

    destroy = () => {
      remove(this.#pointComponent);
      remove(this.#pointEditComponent);
    };
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  }


  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #handleRolldownClick = () => {
    this.#replacePointToForm();
  }

  #handleRollupButton = () => {
    this.#replaceFormToPoint();
  }

  #handleSubmitButton = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  }
}
