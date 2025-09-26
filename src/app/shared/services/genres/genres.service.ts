import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainInterface } from '../../models/main.interfaces';
import { Genres } from '../../models/games.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private url = environment.apiUrl;
  private apiKey = environment.apiKey;

  private httpClient = inject(HttpClient);

  constructor() {}

  getGenresByClick(): Observable<MainInterface<Genres>> {
    const params = new HttpParams({
      fromObject: {
        key: this.apiKey,
      },
    });
    return this.httpClient.get<MainInterface<Genres>>(`${this.url}/genres`, {
      params,
    });
  }
}
