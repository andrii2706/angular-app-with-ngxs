import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  httpResource,
  HttpResponse,
} from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { tap, Observable, map, of, filter, take } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Game, GameDetails } from '../../models/games.interfaces';
import { MainInterface } from '../../models/main.interfaces';
import { FilterParams } from '../../models/filter.interfaces';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  //api properties
  private apiKey = environment.apiKey;
  // dependecy injection
  private httpClient = inject(HttpClient);

  // signals
  homeGames = signal<MainInterface<Game> | null>(null);
  defaultGames = signal<MainInterface<Game> | null>(null);
  games = signal<MainInterface<Game> | null>(null);
  gameById = signal<GameDetails | null>(null);
  savedGames = signal<Game[]>([]);

  savedGamesArr: Game[] = [];
  wishListGames = localStorage.getItem('games');

  constructor() {}

  saveGames(game: Game) {
    this.savedGamesArr.push(game);
    this.savedGames.set(this.savedGamesArr);
  }

  getGames(page: number): Observable<MainInterface<Game> | null> {
    const gamesResource = httpResource<MainInterface<Game>>(() => ({
      url: '/api/games',
      method: 'GET',
    }));

    effect(() => {
      const value = gamesResource.value();
      if (value) {
        this.games.set(value);
      }
    });
    return toObservable(gamesResource.value).pipe(filter(Boolean), take(1));
  }

  getGamesWithGenres(page: number, genres?: string): Observable<MainInterface<Game> | null> {
    const gamesWithResource = httpResource<MainInterface<Game>>(() => ({
      url: '/api/games',
      params: {
        page,
        genres: genres ? genres : '',
        key: '85d9905e7cd7443c8983e54b4733abf5',
      },
    }));
    this.games.set(gamesWithResource.value() ?? null);
    return of(this.games() ?? null);
  }

  getGameById(id: number | null): Observable<GameDetails> {
    return this.httpClient.get<GameDetails>(`/api/games/${id}`);
  }

  getLastReleasedGames(page: number, dates: string): Observable<MainInterface<Game>> {
    const query = (dates: string) => {
      return new HttpParams({
        fromObject: {
          dates: dates,
        },
      });
    };
    return this.httpClient.get<MainInterface<Game>>(`/api/games/last-released`, {
      params: query(dates),
    });
  }

  getGameMovieById(id: string): Observable<any> {
    const paramsForGameBtId = new HttpParams({
      fromObject: {
        key: this.apiKey,
      },
    });
    return this.httpClient.get<any>(`/api/games/${id}/movies`, {
      params: paramsForGameBtId,
    });
  }

  filterGames(page: number, filterParams: FilterParams): Observable<MainInterface<Game>> {
    const paramsForFilter = this.getFilterQueryParameter(filterParams);
    return this.httpClient.get<MainInterface<Game>>(`/api/games?key=${this.apiKey}&page=${page}`, {
      params: paramsForFilter,
    });
  }

  private getFilterQueryParameter(filterParams: FilterParams): HttpParams {
    return Object.entries(filterParams).reduce<HttpParams>((acc, item) => {
      const key = item[0];
      const value = item[1];
      if (value !== '') {
        return acc.append(key, value);
      }
      return acc;
    }, new HttpParams());
  }
}
