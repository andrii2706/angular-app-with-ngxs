import { ResolveFn } from '@angular/router';

export const developersResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
