import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { LoaderAction } from '../../action/loader/loader.actions';

export interface LoaderStateModel {
   status: boolean
}

@State<LoaderStateModel>({
    name: 'loader',
    defaults: {
        status: false
    }
})
@Injectable()
export class LoaderState {

    @Selector()
    static getState(state: LoaderStateModel) {
        return state;
    }

    @Action(LoaderAction)
    setState(ctx: StateContext<LoaderStateModel>, action: LoaderAction){
        ctx.patchState({status: action.status})
    }
}
