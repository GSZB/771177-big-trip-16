import SiteSortView from './../view/site-sort-view';
import TripListTemplate from './../view/trip-list-view';
// import PointPresenter from './../presenter/point-presenter';
// import { destinationData } from './../utils/destination';
// import { render, RenderPosition } from './../utils/render';
// import { DESTINATION_COUNT } from './../mock/data';
// import SiteCreateTemplate from './../view/site-create-view';

export default class TripPresenter {
  #tripContainer = null;

  #sortComponent = new SiteSortView();
  #tripListComponent = new TripListTemplate();

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = () => {

  }
}
