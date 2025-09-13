export interface MainInterface<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
  seo_title?: string;
  seo_h1?: string;
}
