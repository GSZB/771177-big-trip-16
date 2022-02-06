import AbstractObservable from '../utils/abstract-observable';
import { FilterType } from '../mock/data';

export default class FilterModel extends AbstractObservable {
  #filter = FilterType.Everything;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}