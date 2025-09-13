import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { setLoaderStatusAction } from '../../action/loader/loader.actions';

export interface LoaderStateModel {
  status: boolean;
}

@State<LoaderStateModel>({
  name: 'loader',
  defaults: {
    status: false,
  },
})
@Injectable()
export class LoaderState {
  @Selector()
  static getState(state: LoaderStateModel): LoaderStateModel {
    return state;
  }

  @Action(setLoaderStatusAction)
  setState(ctx: StateContext<LoaderStateModel>, action: setLoaderStatusAction) {
    ctx.patchState({ status: action.status });
  }
}
