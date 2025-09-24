import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component, inject, OnInit, output } from '@angular/core';
import { Store } from '@ngxs/store';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private store = inject(Store);
  private route = inject(Router);

  private registerForm!: FormGroup;

  showLogin = output<boolean>();

  showSnackbarError: boolean = false;
  showSnackbarSuccess: boolean = false;

  ngOnInit(): void {}

  initForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    });
  }

  register() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    this.authService
      .registerUserWithCredetials(email, password)
      .then((res) => {
        if (res) {
          this.showSnackbarSuccess = true;
          setTimeout(() => {
            this.showSnackbarSuccess = false;
          }, 3000);
          this.authService.changeLoginStatus(true);
          this.route.navigate(['home']);
        }
      })
      .catch((error) => {
        if (error) {
          this.showSnackbarError = true;
          setTimeout(() => {
            this.showSnackbarError = false;
          }, 3000);
        }
        this.store.dispatch(new setLoaderStatusAction(false));
      })
      .finally(() => {
        this.store.dispatch(new setLoaderStatusAction(false));
      });
  }
  showLoginBlock() {
    this.showLogin.emit(false);
  }
}
