import { DestroyRef, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GamesService } from '../../services/games/games.service';
import { finalize, map } from 'rxjs';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const homeResolver: ResolveFn<boolean> = (route, state) => {
  const page = 0;
  const pageNumber = 10;

  const store = inject(Store);
  const gamesService = inject(GamesService);
  const destroyRef = inject(DestroyRef);

  gamesService.getGames().pipe(
    map((games) => {}),
    finalize(() => store.dispatch(new setLoaderStatusAction(false))),
    takeUntilDestroyed(destroyRef)
  );
  return true;
};
