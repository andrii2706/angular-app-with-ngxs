import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { debounceTime } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

  private route = inject(Router);

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {}

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
    this.authService.loginWithCredetials(email, password).then().catch().finally();
  }

  loginWithGoogle() {
    this.showSpinner = true;
    this.authService
      .loginWithGoogleAuthO2()
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
        this.showSpinner = false;
      })
      .finally(() => {
        this.showSpinner = false;
      });
  }
}
