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
  const wishListGames = localStorage.getItem('games');

  return gamesService.getLastReleasedGames(page, `${firstYearDay},${lastYearDay}`).pipe(
    tap((games) => {
      const gamesInfo = JSON.parse(wishListGames || '');
      const gameId = gamesInfo.map((game: { game: Game; status: string }) => game.game.id);
      const gamesSaved = games?.results?.map((g) => ({ ...g, isBought: gameId.includes(g.id) }));
      const homeGames = {
        count: games.count,
        next: games.next,
        previous: games.previous,
        results: gamesSaved,
        seo_title: games.seo_title,
        seo_h1: games.seo_h1,
      };
      gamesService.homeGames.set(homeGames);
      gamesService.defaultGames.set(homeGames);
    }),
    finalize(() => store.dispatch(new setLoaderStatusAction(false))),
    takeUntilDestroyed(destroyRef)
  );
};
