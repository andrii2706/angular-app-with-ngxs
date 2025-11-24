import { setLoaderStatusAction } from './store/action/loader/loader.actions';
import { AuthService } from './shared/services/auth/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  Inject,
  Injector,
  OnInit,
  PLATFORM_ID,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Observable, of } from 'rxjs';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { Store } from '@ngxs/store';
import { LoaderState } from './store/states/loader/loader.state';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { SnackbarErrorState, SnackbarSuccessState } from './store/states/snackbar/snackbar.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, LoaderComponent, SnackbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  userStatus: Observable<boolean | null> = of(false);
  spinnerStatus = signal(false);
  snackbarSuccesStatus = signal(false);
  snackbarSuccesMessage = signal('');
  snackbarErrorStatus = signal(false);
  snackbarErrorMessage = signal('');

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private store: Store,
    private injector: Injector
  ) {
    localStorage.setItem('games', '[]');
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.userStatus = this.authService.userLoginStatus$;
    const loggedIn = localStorage.getItem('isUserLogined');

    if (!!loggedIn === true) {
      if (this.authService.LoginStatus) {
        this.authService.changeLoginStatus(true);
      }
    }

    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.store.select(LoaderState.getState).subscribe((state) => {
          this.spinnerStatus.set(state.status);
        });
        this.store.select(SnackbarSuccessState.getState).subscribe((state) => {
          this.snackbarSuccesStatus.set(state.status);
          this.snackbarSuccesMessage.set(state.message);
        });
        this.store.select(SnackbarErrorState.getState).subscribe((state) => {
          this.snackbarErrorStatus.set(state.status);
          this.snackbarErrorMessage.set(state.message);
        });
      });
    });
  }
}
