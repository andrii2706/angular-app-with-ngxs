import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { developersResolver } from './developers.resolver';

describe('developersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => developersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
