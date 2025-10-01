export interface Developers {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games: DevelopersGamesInfo[];
}

export interface DevelopersGamesInfo {
  id: number;
  slug: string;
  name: string;
  added: number;
}
