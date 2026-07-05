import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngxs/store';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, LucideAngularModule, FilterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private navigation = inject(Router);
  private store = inject(Store);

  showMenuClick: boolean = false;
  showFilterProp: boolean = false;

  isUserLogined = computed(() => this.authService.LoginStatus);

  showFilter() {
    this.showFilterProp = !this.showFilterProp;
  }

  showMenuMethod() {
    this.showMenuClick = !this.showMenuClick;
  }

  logOutUser() {
    this.authService.logoutFromApp().then(() => {
      this.authService.changeLoginStatus(false);
      this.navigation.navigate(['/auth']);
      localStorage.setItem('isUserLogined', 'false');
    });
  }
}
