export interface Platforms {
  platform: {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: number | null;
    year_start: number | null;
    games_count: number;
    image_background: string;
  };
}

export interface Game {
  id: number;
  slug?: string;
  name: string;
  isBought?: boolean;
  name_original?: string;
  description?: string;
  released?: string;
  background_image?: string;
  tba?: boolean;
  rating?: number;
  rating_top?: number;
  metacritic?: number;
  genres?: Genres[];
  stores?: Stores[];
  platforms?: Platforms[];
}

export interface GameDetails {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  developers: [
    {
      id: number;
      name: string;
      slug: string;
      games_count: number;
      image_background: string;
    },
  ];
  metacritic: number;
  metacritic_platforms: [
    {
      metascore: number;
      url: string;
      platform: {
        name: string;
      };
    },
  ];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: [
    {
      id: number;
      title: string;
      count: number;
      percent: number;
    },
  ];
  reactions: {
    [key: string]: number;
  };
  platforms: Platforms[];
  genres: Genres[];
  stores: Stores[];
  tags: [
    {
      id: number;
      name: string;
      slug: string;
      language: string;
      image_background: string;
      games_count: number;
    },
  ];
}

export interface ScreenShots {
  count: number;
  next: null;
  previous: null;
  results: [
    {
      id: number;
      image: string;
      is_deleted: boolean;
    },
  ];
}

export interface ScreenShot {
  id: number;
  image: string;
  is_deleted: boolean;
}

export interface GameTrailers {
  count: number;
  next: null;
  previous: null;
  results: [
    {
      id: number;
      name: string;
      preview: string;
      data: {
        480: string;
        max: string;
      };
    },
  ];
}

export interface GameTrailer {
  id: number;
  name: string;
  preview: string;
  date: object;
}

export interface Genres {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

export interface Stores {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    image_background: string;
  };
}

export interface IAchivments {
  count: number;
  next: null;
  previous: null;
  results: [
    {
      id: number;
      name: string;
      description: string;
      image: string;
      percent: string;
    },
  ];
}

export interface FilterParams {
  search?: string;
  platforms?: string;
  ordering?: string;
  metacritic?: string;
  developers?: string;
  dates?: string;
}
