import { DestroyRef, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GamesService } from '../../services/games/games.service';
import { NewsService } from '../../services/news/news.service';
import { finalize, forkJoin, tap } from 'rxjs';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Game } from '../../models/games.interfaces';
import { HomeResolverInterface } from '../../models/main.interfaces';

export const homeResolver: ResolveFn<HomeResolverInterface> = (route, state) => {
  const page = 1;
  const firstYearDay = new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  const lastYearDay = new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0];

  const store = inject(Store);
  const gamesService = inject(GamesService);
  const newsService = inject(NewsService);
  const destroyRef = inject(DestroyRef);
  const wishListGames = localStorage.getItem('games');

  return forkJoin({
    games: gamesService.getLastReleasedGames(page, `${firstYearDay},${lastYearDay}`),
    news: newsService.getNews(1),
  }).pipe(
    tap(({ games, news }) => {
      const gamesInfo = JSON.parse(wishListGames || '[]');
      const gameId = gamesInfo.map((game: { game: Game; status: string }) => game.game.id);
      const gamesSaved = games?.results?.map((g) => ({ ...g, isBought: gameId.includes(g.id) }));

      const homeGames = {
        results: gamesSaved,
        esresponse: {
          total: games.results?.length ?? 0,
          totalPages: 0,
        },
      };

      gamesService.homeGames.set(homeGames);
      gamesService.defaultGames.set(homeGames);
      newsService.news.set(news);
    }),
    finalize(() => store.dispatch(new setLoaderStatusAction(false))),
    takeUntilDestroyed(destroyRef)
  );
};
