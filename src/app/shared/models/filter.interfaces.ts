export interface FilterParams {
  search?: string;
  platforms?: string;
  ordering?: string;
  metacritic?: string;
  developers?: string;
  creators?: string;
  tags?: string;
}

export interface DevelopersFilters {
  developersName: string;
  slug: string;
}

export interface PlatformsFilters {
  platformsName: string;
  slug: string;
}

export interface OrderByInfos {
  name: string;
  slug: string;
}

export interface Metacritics {
  name: string;
  slug: string;
}

export interface Tags {
  name: string;
  slug: string;
}
