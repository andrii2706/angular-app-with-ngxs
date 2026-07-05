import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { RegisterComponent } from './register/register.component';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setLoaderStatusAction } from '../../store/action/loader/loader.actions';
import {
  setSnackbarErrorShowAction,
  setSnackbarSuccessShowAction,
} from '../../store/action/snackbar/snackbar.actions';

@Component({
  selector: 'app-auth',
  imports: [RegisterComponent, FormField],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  private store = inject(Store);
  private route = inject(Router);

  registerForm: boolean = false;
  showSpinner: boolean = false;
  showSnackbarError: boolean = false;
  showSnackbarSuccess: boolean = false;

  private loginCredetialsFormSignal = signal({ email: '', password: '' });

  public loginCredetialsForm = form(this.loginCredetialsFormSignal, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    required(schemaPath.password, { message: 'Password is required' });
    email(schemaPath.email, { message: 'Invalid Email' });
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  showRegister() {
    this.registerForm = !this.registerForm;
  }

  loginWithCredetials() {
    const email = this.loginCredetialsForm().value().email;
    const password = this.loginCredetialsForm().value().password;
    this.authService
      .loginWithCredetials(email, password)
      .then((res) => {
        if (res) {
          this.store.dispatch(
            new setSnackbarSuccessShowAction(true, 'You Are Loggined Success fully')
          );
          setTimeout(() => {
            this.store.dispatch(new setSnackbarSuccessShowAction(false, ''));
          }, 3000);
          this.authService.changeLoginStatus(true);
          this.route.navigate(['home']);
        }
      })
      .catch((error) => {
        if (error) {
          this.store.dispatch(
            new setSnackbarErrorShowAction(
              true,
              'You are not loggined please wait some time and try again'
            )
          );
          setTimeout(() => {
            this.store.dispatch(new setSnackbarErrorShowAction(false, ''));
          }, 3000);
        }
        this.store.dispatch(new setLoaderStatusAction(false));
      });
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogleAuthO2()
      .then((res) => {
        if (res) {
          this.store.dispatch(
            new setSnackbarSuccessShowAction(true, 'You Are Loggined Success fully')
          );
          setTimeout(() => {
            this.store.dispatch(new setSnackbarSuccessShowAction(false, ''));
          }, 3000);
          this.authService.changeLoginStatus(true);
          this.route.navigate(['home']);
        }
      })
      .catch((error) => {
        if (error) {
          this.store.dispatch(
            new setSnackbarErrorShowAction(
              true,
              'You are not loggined please wait some time and try again'
            )
          );
          setTimeout(() => {
            this.store.dispatch(new setSnackbarErrorShowAction(false, ''));
          }, 3000);
        }
        this.store.dispatch(new setLoaderStatusAction(false));
      });
  }

  returnToLoginBlock(status: boolean) {
    this.registerForm = status;
  }
}
