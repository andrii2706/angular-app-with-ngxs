import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Game, GameDetails } from '../../models/games.interfaces';
import { MainInterface } from '../../models/main.interfaces';
import { FilterParams } from '../../models/filter.interfaces';

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
  gameById = signal<Game | null>(null);

  constructor() {}

  getGames(page: number): Observable<MainInterface<Game>> {
    const paramsForGames = new HttpParams({
      fromObject: {
        page,
        key: '85d9905e7cd7443c8983e54b4733abf5',
      },
    });
    return this.httpClient.get<MainInterface<Game>>(`/api/games`, {
      params: paramsForGames,
    });
  }

  getGamesWithGenres(page: number, genres?: string): Observable<MainInterface<Game>> {
    const paramsForGames = new HttpParams({
      fromObject: {
        page,
        genres: genres ? genres : '',
        key: '85d9905e7cd7443c8983e54b4733abf5',
      },
    });
    return this.httpClient.get<MainInterface<Game>>(`/api/games`, {
      params: paramsForGames,
    });
  }

  getGameById(id: number | null): Observable<GameDetails> {
    const paramsForGameBtId = new HttpParams({
      fromObject: {
        key: this.apiKey,
      },
    });
    return this.httpClient.get<GameDetails>(`/api/games/${id}`, {
      params: paramsForGameBtId,
    });
  }

  getLastReleasedGames(page: number, dates: string): Observable<MainInterface<Game>> {
    const query = (dates: string) => {
      return new HttpParams({
        fromObject: {
          key: '85d9905e7cd7443c8983e54b4733abf5',
          page,
          dates: dates,
        },
      });
    };
    return this.httpClient.get<MainInterface<Game>>(`/api/games`, {
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
