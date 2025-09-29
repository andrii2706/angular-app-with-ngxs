import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Game, GameDetails } from '../../models/games.interfaces';
import { MainInterface } from '../../models/main.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  //api properties
  private url = environment.apiUrl;
  private apiKey = environment.apiKey;
  // dependecy injection
  private httpClient = inject(HttpClient);

  // signals
  homeGames = signal<MainInterface<Game> | null>(null);
  games = signal<MainInterface<Game> | null>(null);
  gameById = signal<Game | null>(null);

  constructor() {}

  getGames(page: number): Observable<MainInterface<Game>> {
    const paramsForGames = new HttpParams({
      fromObject: {
        page,
        key: this.apiKey,
      },
    });
    return this.httpClient.get<MainInterface<Game>>(`${this.url}games`, {
      params: paramsForGames,
    });
  }

  getGameById(id: number | null): Observable<GameDetails> {
    const paramsForGameBtId = new HttpParams({
      fromObject: {
        key: this.apiKey,
      },
    });
    return this.httpClient.get<GameDetails>(`${this.url}games/${id}`, {
      params: paramsForGameBtId,
    });
  }

  getLastReleasedGames(
    page: number,
    dates: string,
    ordering: string = ''
  ): Observable<MainInterface<Game>> {
    const query = (dates: string) =>
      new HttpParams({
        fromObject: {
          key: this.apiKey,
          page,
          dates: dates,
        },
      });
    return this.httpClient.get<MainInterface<Game>>(`${this.url}games`, {
      params: query(dates),
    });
  }

  getGamesByGenres(page: number, genres: string): Observable<MainInterface<Game>> {
    const params = new HttpParams({
      fromObject: {
        page,
        key: this.apiKey,
      },
    });
    return this.httpClient.get<MainInterface<Game>>(`${this.url}games`, {
      params,
    });
  }

  getGameMovieById(id: string): Observable<any> {
    const paramsForGameBtId = new HttpParams({
      fromObject: {
        key: this.apiKey,
      },
    });
    return this.httpClient.get<any>(`${this.url}games/${id}/movies`, {
      params: paramsForGameBtId,
    });
  }
}
