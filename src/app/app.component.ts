import { AuthService } from './shared/services/auth/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Observable, of } from 'rxjs';
import { LoaderComponent } from "./shared/components/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  userStatus: Observable<boolean | null> = of(false);
  spinnerStatus = signal(false)

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
    return;
  }
    this.userStatus = this.authService.userLoginStatus$;
    const loggedIn = localStorage.getItem('isUserLogined');

    if (!!loggedIn === true) {
      if (this.authService.LoginStatus) {
        this.authService.changeLoginStatus(true);
       this.spinnerStatus.set(true)
      }
    }
      this.spinnerStatus.set(false)
  }

}
