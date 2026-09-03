import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from './shared/services/error-service/error-service.service';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { SnackbarService } from './shared/services/snackbar/snackbar.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const errorService = inject(ErrorService);
  const snackbarService = inject(SnackbarService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Error: ${error.error.message}`;
      } else {
        errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;

        if (error.status === 404 || error.status === 500) {
          snackbarService.show('Something went wrong !', 'error', 800);
        } else if (!navigator.onLine) {
          if (error.status === 0) {
            router.navigate(['/no-internet-connection']);
          }
        }
      }
      errorService.fullErrorObject(true);
      return throwError(() => new Error(errorMsg));
    })
  );
};
