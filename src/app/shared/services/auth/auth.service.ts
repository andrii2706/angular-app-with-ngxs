import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: Auth ) { }

 async loginWithGoogleAuthO2(){
      const googleAuthProvider = new GoogleAuthProvider();
    return await signInWithPopup(this.firebaseAuth, googleAuthProvider)
  }

 async loginWithCredetials(email: string, password: string){
    return await signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

 async registerUserWithCredetials(email: string, password: string){
  try{
    const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
    return userCredential.user;
  }catch (error) {
    console.error(error)
    throw error
  }
  }

  async logoutFromApp(){
      return await this.firebaseAuth.signOut();
  }

}
