import { DestroyRef, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GamesService } from '../../services/games/games.service';
import { finalize, map, tap } from 'rxjs';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MainInterface } from '../../models/main.interfaces';
import { Game } from '../../models/games.interfaces';

export const homeResolver: ResolveFn<MainInterface<Game>> = (route, state) => {
  const page = 1;
  const firstYearDay = new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];

  const lastYearDay = new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0];

  const store = inject(Store);
  const gamesService = inject(GamesService);
  const destroyRef = inject(DestroyRef);

  return gamesService.getLastReleasedGames(page, `${firstYearDay},${lastYearDay}`).pipe(
    tap((games) => {
      gamesService.homeGames.set(games);

    }),
    finalize(() => store.dispatch(new setLoaderStatusAction(false))),
    takeUntilDestroyed(destroyRef)
  );
};
