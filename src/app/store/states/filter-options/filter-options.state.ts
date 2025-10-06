import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { FilterParams } from '../../../shared/models/filter.interfaces';
import {
  addFilterOptionsAction,
  btnClearFilterFormStatusAction,
  btnClearSearchInputStatusAction,
  clearFilterOptionsAction,
} from '../../action/filter-options/filter-options.actions';

@State<FilterParams>({
  name: 'filterOptions',
  defaults: {
    search: '',
    platforms: '',
    ordering: '',
    metacritic: '',
    developers: '',
    tags: '',
  },
})
@Injectable()
export class FilterOptionsState {
  @Selector()
  static getState(state: FilterParams) {
    return state;
  }

  @Action(addFilterOptionsAction)
  setFilterOption(ctx: StateContext<FilterParams>, action: addFilterOptionsAction) {
    const filterOptions = action.filterOptions;
    ctx.patchState(filterOptions);
  }

  @Action(clearFilterOptionsAction)
  setClearFilterOption(ctx: StateContext<FilterParams>, action: clearFilterOptionsAction) {
    const filterOptions = action.filterOptions;
    ctx.patchState(filterOptions);
  }

  @Action(btnClearFilterFormStatusAction)
  setFilterButtonStatus() {}

  @Action(btnClearSearchInputStatusAction)
  setSearchButtonStatus() {}
}
