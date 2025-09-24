import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';
import { Store } from '@ngxs/store';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);

  return authService.userLoginStatus$.pipe(
    map((status) => {
      store.dispatch(new setLoaderStatusAction(true));
      if (status && state.url === '/auth') {
        store.dispatch(new setLoaderStatusAction(false));
        router.navigate(['/home']);
        return false;
      } else if (state.url !== '/auth' && !status) {
        console.log('logout');
      }

      if (status) {
        return true;
      }

      if (state.url === '/auth') {
        store.dispatch(new setLoaderStatusAction(false));
        return true;
      } else {
        router.navigate(['/auth']);
        return false;
      }
    })
  );
};
