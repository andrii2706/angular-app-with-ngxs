import { Game } from './games.interfaces';
import { News } from './news.interface';

export interface MainInterface<T> {
  results: T[];
  esresponse: {
    total: number;
    totalPages: number;
  };
}

export interface HomeResolverInterface {
  games: MainInterface<Game>;
  news: MainInterface<News>;
}
