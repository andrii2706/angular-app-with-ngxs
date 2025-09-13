import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { DevelopersState, DevelopersStateModel } from './developers.state';

describe('Developers state', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([DevelopersState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an empty state', () => {
    const actual = store.selectSnapshot(DevelopersState.getState);
    const expected: DevelopersStateModel = {
      items: [],
    };
    expect(actual).toEqual(expected);
  });
});
