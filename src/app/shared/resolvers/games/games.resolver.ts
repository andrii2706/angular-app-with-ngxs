import { ResolveFn } from '@angular/router';
import { Game } from '../../models/games.interfaces';
import { DestroyRef, inject, WritableSignal } from '@angular/core';
import { GamesService } from '../../services/games/games.service';
import { Store } from '@ngxs/store';
import { finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';
import { MainInterface } from '../../models/main.interfaces';

export const gamesResolver: ResolveFn<MainInterface<Game> | null> = (route, state) => {
  const store = inject(Store);
  const gamesService = inject(GamesService);
  const destroyRef = inject(DestroyRef);
  const wishListGames = localStorage.getItem('games');

  return gamesService.getGames(1).pipe(
    tap((games) => {
      gamesService.games.set(games as MainInterface<Game>);
      gamesService.defaultGames.set(games as MainInterface<Game>);
    }),
    finalize(() => store.dispatch(new setLoaderStatusAction(false))),
    takeUntilDestroyed(destroyRef)
  );
};
