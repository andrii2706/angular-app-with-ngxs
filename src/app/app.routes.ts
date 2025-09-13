import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard/auth.guard';
import { homeResolver } from './shared/resolvers/home-resolver/home.resolver';
import { developersResolver } from './shared/resolvers/developers/developers.resolver';
import { gamesResolver } from './shared/resolvers/games/games.resolver';
import { profileResolver } from './shared/resolvers/profile/profile.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then((c) => c.AuthComponent),
    title: 'Auth',
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
    title: 'Home',
    canActivate: [authGuard],
    resolve: [homeResolver],
  },
  {
    path: 'games',
    loadComponent: () => import('./pages/games/games.component').then((c) => c.GamesComponent),
    title: 'Games',
    canActivate: [authGuard],
    resolve: [gamesResolver],
  },
  {
    path: 'developers',
    loadComponent: () =>
      import('./pages/developers/developers.component').then((c) => c.DevelopersComponent),
    title: 'Developers',
    canActivate: [authGuard],
    resolve: [developersResolver],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((c) => c.ProfileComponent),
    title: 'Profile',
    canActivate: [authGuard],
    resolve: [profileResolver],
  },
];
