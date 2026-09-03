import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnInit,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { AuthService } from './shared/services/auth/auth.service';
import { SnackbarService } from './shared/services/snackbar/snackbar.service';
import { LoaderState } from './store/states/loader/loader.state';
import { SnackbarErrorState, SnackbarSuccessState } from './store/states/snackbar/snackbar.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoaderComponent, SnackbarComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  private readonly store = inject(Store);
  private readonly snackbarService = inject(SnackbarService);
  private readonly destroyRef = inject(DestroyRef);

  userStatus = this.authService.userLoginStatus$;

  spinnerStatus = toSignal(
    this.store.select(LoaderState.getState).pipe(map((state) => state.status)),
    { initialValue: false }
  );

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem('games', '[]');

    const loggedIn = localStorage.getItem('isUserLogined');
    if (loggedIn && this.authService.LoginStatus) {
      this.authService.changeLoginStatus(true);
    }

    this.store
      .select(SnackbarSuccessState.getState)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => this.snackbarService.show(state.message, 'success', 800));

    this.store
      .select(SnackbarErrorState.getState)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => this.snackbarService.show(state.message, 'error', 800));
  }
}
