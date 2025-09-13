import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private httpClient = inject(HttpClient);
  private url = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor() {}

    getGames(): Observable<any>{
      return this.httpClient.get<any>(`${this.url}games`);
    }

    getGameById(id: number): Observable<any>{
      return this.httpClient.get<any>(`${this.url}games/${id}`, {
			// params: paramsForGameBtId,
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
			`${this.url}games/${id}/movies`,
			// {
			// 	params: paramsForGameBtId,
			// }
		);
	}

}
