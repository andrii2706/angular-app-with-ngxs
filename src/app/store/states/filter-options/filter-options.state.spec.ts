import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { FilterOptionsState, FilterOptionsStateModel } from './filter-options.state';

describe('FilterOptions state', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([FilterOptionsState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an empty state', () => {
    const actual = store.selectSnapshot(FilterOptionsState.getState);
    const expected: FilterOptionsStateModel = {
      items: [],
    };
    expect(actual).toEqual(expected);
  });
});
