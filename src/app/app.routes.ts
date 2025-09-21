import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard/auth.guard';
import { homeResolver } from './shared/resolvers/home-resolver/home.resolver';
import { developersResolver } from './shared/resolvers/developers/developers.resolver';
import { gamesResolver } from './shared/resolvers/games/games.resolver';
import { profileResolver } from './shared/resolvers/profile/profile.resolver';
import { gameDetailsResolver } from './shared/resolvers/game-details/game-details.resolver';
import { GameDetailsComponent } from './pages/games/components/game-details/game-details.component';

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
          path: 'games/:id',
          loadComponent: () => import('./pages/games/components/game-details/game-details.component').then((c) => c.GameDetailsComponent),
          canActivate: [authGuard],
          resolve: [gameDetailsResolver]
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
