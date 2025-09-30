import { FilterParams } from '../../../shared/models/filter.interfaces';

export class addFilterOptionsAction {
  static readonly type = '[FilterOptions] Make search';
  constructor(readonly filterOptions: FilterParams) {}
}

export class clearFilterOptionsAction {
  static readonly type = '[FilterOptions] Clear filter search';
  constructor(readonly filterOptions: FilterParams) {}
}
