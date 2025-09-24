import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import {
  setSnackbarErrorShowAction,
  setSnackbarSuccessShowAction,
} from '../../action/snackbar/snackbar.actions';

export interface SnackbarSuccess {
  status: boolean;
  message: string;
}
export interface SnackbarError {
  status: boolean;
  message: string;
}

@State<SnackbarSuccess>({
  name: 'snackbarSuccess',
  defaults: {
    status: false,
    message: '',
  },
})
@Injectable()
export class SnackbarSuccessState {
  @Selector()
  static getState(state: SnackbarSuccess): SnackbarSuccess {
    return state;
  }

  @Action(setSnackbarSuccessShowAction)
  setSnackbarState(ctx: StateContext<SnackbarSuccess>, action: setSnackbarSuccessShowAction) {
    ctx.patchState({ status: action.status, message: action.message });
  }
}

@State<SnackbarError>({
  name: 'snackbarError',
  defaults: {
    status: false,
    message: '',
  },
})
@Injectable()
export class SnackbarErrorState {
  @Selector()
  static getState(state: SnackbarError): SnackbarError {
    return state;
  }

  @Action(setSnackbarSuccessShowAction)
  setSnackbarState(ctx: StateContext<SnackbarError>, action: setSnackbarErrorShowAction) {
    ctx.patchState({ status: action.status, message: action.message });
  }
}
