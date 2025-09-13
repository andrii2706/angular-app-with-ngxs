import { Injectable } from '@angular/core';
import { State, Selector } from '@ngxs/store';

export interface DevelopersStateModel {
  items: string[];
}

@State<DevelopersStateModel>({
  name: 'developers',
  defaults: {
    items: [],
  },
})
@Injectable()
export class DevelopersState {
  @Selector()
  static getState(state: DevelopersStateModel) {
    return state;
  }
}
