import { Injectable } from '@angular/core';
import { State, Selector } from '@ngxs/store';

export interface FilterOptionsStateModel {
  items: string[];
}

@State<FilterOptionsStateModel>({
  name: 'filterOptions',
  defaults: {
    items: [],
  },
})
@Injectable()
export class FilterOptionsState {
  @Selector()
  static getState(state: FilterOptionsStateModel) {
    return state;
  }
}
