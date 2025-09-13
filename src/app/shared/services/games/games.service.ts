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
  games = signal<MainInterface<Game> | null>(null);

  constructor() {}

  getGames(): Observable<MainInterface<Game>> {
    const paramsForGames = new HttpParams({
      fromObject: {
        key: this.apiKey,
      },
    });
    return this.httpClient.get<MainInterface<Game>>(`${this.url}games`, {
      params: paramsForGames,
    });
  }

  getGameById(id: number): Observable<GameDetails> {
    const paramsForGameBtId = new HttpParams({
      fromObject: {
        key: this.apiKey,
      },
    });
    return this.httpClient.get<GameDetails>(`${this.url}games/${id}`, {
      params: paramsForGameBtId,
    });
  }

  getLastReleasedGames(page: number, dates: string): Observable<any> {
    // const query = (dates: string) =>
    // 	new HttpParams({
    // 		fromObject: {
    // 			key: this.key,
    // 			page,
    // 			dates: dates,
    // 		},
    // 	});
    return this.httpClient.get<any>(`${this.url}games`, {
      // params: query(dates),
    });
  }

  getGameMovieById(id: string): Observable<any> {
    // const paramsForGameBtId = new HttpParams({
    // 	fromObject: {
    // 		key: this.key,
    // 	},
    // });
    return this.httpClient.get<any>(
      `${this.url}games/${id}/movies`
      // {
      // 	params: paramsForGameBtId,
      // }
    );
  }
}
