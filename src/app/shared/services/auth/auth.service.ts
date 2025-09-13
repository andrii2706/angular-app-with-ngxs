import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private userLoginStatus = new BehaviorSubject<boolean>(false);
  userLoginStatus$: Observable<boolean> = this.userLoginStatus.asObservable();

  private loggedInStatus: boolean = false;

  constructor(private firebaseAuth: Auth) {}

  setLoginStatus(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('isUserLogined', 'false');
  }

  changeLoginStatus(status: boolean, userInfo?: User | null) {
    this.loggedInStatus = status;
    localStorage.setItem('isUserLogined', `${this.loggedInStatus}`);
    this.userLoginStatus.next(status);
    if (userInfo) {
      // this.getGameById(userInfo.uid).then(() => {
      // 	localStorage.setItem(
      // 		'user',
      // 		JSON.stringify({ ...userInfo, games: [] })
      // 	);
      // });
    } else {
      localStorage.removeItem('user');
    }
  }

  get LoginStatus(): boolean {
    return JSON.parse(localStorage.getItem('isUserLogined') || this.loggedInStatus.toString());
  }

  async loginWithGoogleAuthO2() {
    const googleAuthProvider = new GoogleAuthProvider();
    return await signInWithPopup(this.firebaseAuth, googleAuthProvider);
  }

  async loginWithCredetials(email: string, password: string) {
    return await signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  async registerUserWithCredetials(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async logoutFromApp() {
    return await this.firebaseAuth.signOut();
  }
}
