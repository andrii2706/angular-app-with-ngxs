import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { CreatorsState, CreatorsStateModel } from './creators.state';

describe('Creators state', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([CreatorsState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an empty state', () => {
    const actual = store.selectSnapshot(CreatorsState.getState);
    const expected: CreatorsStateModel = {
      items: [],
    };
    expect(actual).toEqual(expected);
  });
});
