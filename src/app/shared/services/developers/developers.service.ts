import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { MainInterface } from '../../models/main.interfaces';
import { Developers } from '../../models/developers.interface';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {
  //api properties
  private apiKey = environment.apiKey;
  // dependecy injection
  private httpClient = inject(HttpClient);
  //signals
  developers = signal<MainInterface<Developers> | null>(null);
  defaultDevelopers = signal<MainInterface<Developers> | null>(null);

  getDevelopers(page: number): Observable<MainInterface<Developers>> {
    const paramsForGames = new HttpParams({
      fromObject: {
        page,
        key: this.apiKey,
      },
    });
    return this.httpClient.get<MainInterface<Developers>>('/api/developers', {
      params: paramsForGames,
    });
  }
}
