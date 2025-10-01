import { ResolveFn } from '@angular/router';
import { Game } from '../../models/games.interfaces';
import { DestroyRef, inject } from '@angular/core';
import { GamesService } from '../../services/games/games.service';
import { Store } from '@ngxs/store';
import { finalize, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';
import { MainInterface } from '../../models/main.interfaces';

export const gamesResolver: ResolveFn<MainInterface<Game>> = (route, state) => {
  const store = inject(Store);
  const gamesService = inject(GamesService);
  const destroyRef = inject(DestroyRef);

  return gamesService.getGames(1).pipe(
    tap((games) => {
      gamesService.games.set(games);
      gamesService.defaultGames.set(games);
    }),
    finalize(() => store.dispatch(new setLoaderStatusAction(false))),
    takeUntilDestroyed(destroyRef)
  );
};
