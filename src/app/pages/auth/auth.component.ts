import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-auth',
  imports: [RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  registerForm: boolean = false;
  showSpinner: boolean = false;

  loginCredetialsForm!: FormGroup;

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
    this.authService.loginWithCredetials(email, password).then().catch().finally();
  }

  loginWithGoogle() {
    this.authService.loginWithGoogleAuthO2().then().catch().finally();
  }
}
