import { setLoaderStatusAction } from './store/action/loader/loader.actions';
import { AuthService } from './shared/services/auth/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  userStatus: Observable<boolean | null> = of(false);
  spinnerStatus = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private store: Store,
    private injector: Injector
  ) {}

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
      });
    });
  }
}
