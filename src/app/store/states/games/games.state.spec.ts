import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { GamesState, GamesStateModel } from './games.state';

describe('Games state', () => {
    let store: Store;

    beforeEach(() => {
      TestBed.configureTestingModule({
       providers: [provideStore([GamesState])]
      
      });

      store = TestBed.inject(Store);
    });

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(GamesState.getState);
        const expected: GamesStateModel = {
            items: []
        };
        expect(actual).toEqual(expected);
    });

});
