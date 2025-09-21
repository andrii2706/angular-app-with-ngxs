import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
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
import { LoaderState } from './store/states/loader/loader.state';
import { environment } from '../environment/environment';
import { LucideAngularModule, ChevronRight, Heart, Activity, Airplay, AlarmClock, AlarmClockCheck, AlarmClockMinus, AlarmClockOff, Album, Anchor, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Badge, Bell, Book, Bookmark, Calendar, Camera, Check, ChevronDown, ChevronLeft, ChevronUp, Home, Info, Play, Plus, Settings, Star, User, Search } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideStore([LoaderState], withNgxsReduxDevtoolsPlugin(), withNgxsFormPlugin()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Activity,
        Airplay,
        AlarmClock,
        AlarmClockCheck,
        AlarmClockMinus,
        AlarmClockOff,
        Album,
        Anchor,
        ArrowDown,
        ArrowLeft,
        ArrowRight,
        ArrowUp,
        Badge,
        Bell,
        Book,
        Bookmark,
        Calendar,
        Camera,
        Check,
        ChevronDown,
        ChevronLeft,
        ChevronRight,
        ChevronUp,
        Heart,
        Home,
        Info,
        Play,
        Plus,
        Star,
        User,
        Settings,
        Search
      })
    )
  ],
};
