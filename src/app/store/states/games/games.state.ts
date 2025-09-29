import { Injectable } from '@angular/core';
import { State, Selector, Action } from '@ngxs/store';

export interface GamesStateModel {
  items: string[];
}

@State<GamesStateModel>({
  name: 'games',
  defaults: {
    items: [],
  },
})
@Injectable()
export class GamesState {
  @Selector()
  static getState(state: GamesStateModel) {
    return state;
  }
}
