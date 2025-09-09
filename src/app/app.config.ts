import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { provideStore } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideStore([], withNgxsReduxDevtoolsPlugin(), withNgxsFormPlugin()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-presentation-for-fe',
        appId: '1:1005106472230:web:3095aa554c5e34e7698de7',
        storageBucket: 'angular-presentation-for-fe.firebasestorage.app',
        apiKey: 'AIzaSyBLmJ0fMchn9qwjbqywIEO2L5g5in9zRNo',
        authDomain: 'angular-presentation-for-fe.firebaseapp.com',
        messagingSenderId: '1005106472230',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
