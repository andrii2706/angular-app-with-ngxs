import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../../models/news.interface';
import { MainInterface } from '../../models/main.interfaces';

@Service()
export class NewsService {
  private httpClient = inject(HttpClient);

  news = signal<MainInterface<News> | null>(null);

  getNews(page?: number): Observable<MainInterface<News>> {
    return this.httpClient.get<MainInterface<News>>(`/api/news?page=${page}`);
  }
}
