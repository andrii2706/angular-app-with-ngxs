import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userLoginStatus$.pipe(
    map((status) => {
      if (status && state.url === '/auth') {
        router.navigate(['/home']);
        return false;
      }

      if (status) {
        return true;
      }

      if (state.url === '/auth') {
        return true;
      } else {
        router.navigate(['/auth']);
        return false;
      }
    })
  );
};
