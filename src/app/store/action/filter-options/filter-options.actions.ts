import { FilterParams } from '../../../shared/models/filter.interfaces';

export class addFilterOptionsAction {
  static readonly type = '[FilterOptions] Make search';
  constructor(readonly filterOptions: FilterParams) {}
}

export class clearFilterOptionsAction {
  static readonly type = '[FilterOptions] Clear filter search';
  constructor(readonly filterOptions: FilterParams) {}
}

export class btnClearFilterFormStatusAction {
  static readonly type = '[FilterOptions] Clear filter button clicked';
  constructor(readonly status: boolean) {}
}

export class btnClearSearchInputStatusAction {
  static readonly type = '[FilterOptions] Clear search button clicked';
  constructor(readonly status: boolean) {}
}
