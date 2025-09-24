import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { debounceTime } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setLoaderStatusAction } from '../../store/action/loader/loader.actions';
import {
  setSnackbarErrorShowAction,
  setSnackbarSuccessShowAction,
} from '../../store/action/snackbar/snackbar.actions';

@Component({
  selector: 'app-auth',
  imports: [RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  registerForm: boolean = false;
  showSpinner: boolean = false;
  showSnackbarError: boolean = false;
  showSnackbarSuccess: boolean = false;

  private loginCredetialsForm!: FormGroup;

  private store = inject(Store);
  private route = inject(Router);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  initForm() {
    this.loginCredetialsForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    });
  }

  showRegister() {
    this.registerForm = !this.registerForm;
  }

  loginWithCredetials() {
    const email = this.loginCredetialsForm.get('email')?.value;
    const password = this.loginCredetialsForm.get('password')?.value;
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
