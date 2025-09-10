import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/auth/auth.component').then((c) => c.AuthComponent),
    title: 'Auth',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
    title: 'Home',
    canActivate: [authGuard],
  },
  {
    path: 'games',
    loadComponent: () => import('./pages/games/games.component').then((c) => c.GamesComponent),
    title: 'Games',
    canActivate: [authGuard],
  },
  {
    path: 'developers',
    loadComponent: () =>
      import('./pages/developers/developers.component').then((c) => c.DevelopersComponent),
    title: 'Developers',
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((c) => c.ProfileComponent),
    title: 'Profile',
    canActivate: [authGuard],
  },
];
