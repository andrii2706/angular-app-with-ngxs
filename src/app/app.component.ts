import { AuthService } from './shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  userStatus: Observable<boolean> = of(false);
  spinnerStatusService: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userStatus = this.authService.userLoginStatus$;
    const loggedIn = localStorage.getItem('isUserLogined');
    if (loggedIn) {
      if (this.authService.LoginStatus) {
        this.authService.userLoginStatus.next(true);
      }
    }
  }
}
