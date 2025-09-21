import { ResolveFn, Router } from '@angular/router';
import { Game, GameDetails } from '../../models/games.interfaces';
import { DestroyRef, inject } from '@angular/core';
import { GamesService } from '../../services/games/games.service';
import { finalize } from 'rxjs';
import { Store } from '@ngxs/store';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const gameDetailsResolver: ResolveFn<GameDetails> = (route, state) => {
 const store = inject(Store);
  const gamesService = inject(GamesService);
  const destroyRef = inject(DestroyRef);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/games']);
  }

  return gamesService.getGameById(Number(id))
    .pipe(
      finalize(() => store.dispatch(new setLoaderStatusAction(false))),
      takeUntilDestroyed(destroyRef)
    );
};
