import { Component, computed, inject, signal } from '@angular/core';
import { NewsService } from '../../../../shared/services/news/news.service';
import { News } from '../../../../shared/models/news.interface';

@Component({
  imports: [],
  selector: 'app-news',
  styleUrl: './news.component.scss',
  templateUrl: './news.component.html',
})
export class NewsComponent {
  private newsService = inject(NewsService);

  newsList = signal<News[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);

  hasMore = computed(() => this.currentPage() < this.totalPages());

  ngOnInit() {
    const initialNews = this.newsService.news();

    if (initialNews?.results?.length) {
      this.newsList.set(initialNews.results);
      this.totalPages.set(initialNews.esresponse.totalPages);
      this.currentPage.set(1);
    } else {
      this.loadPage(1);
    }
  }

  loadPage(page: number) {
    this.newsService.getNews(page).subscribe((res) => {
      this.newsList.update((existing) => [...existing, ...res.results]);
      this.totalPages.set(res.esresponse.totalPages);
      this.currentPage.set(page);
    });
  }

  showMore() {
    this.loadPage(this.currentPage() + 1);
  }
}
