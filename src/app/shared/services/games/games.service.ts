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
      return this.httpClient.get<any>(`${this.url}games${this.apiKey}`);
    }


}
