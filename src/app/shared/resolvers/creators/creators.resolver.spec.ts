import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { creatorsResolver } from './creators.resolver';

describe('creatorsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => creatorsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
