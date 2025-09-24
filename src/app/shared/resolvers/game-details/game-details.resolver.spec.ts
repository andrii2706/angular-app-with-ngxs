import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { gameDetailsResolver } from '../game-details.resolver';

describe('gameDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => gameDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
