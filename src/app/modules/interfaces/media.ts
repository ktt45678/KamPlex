export interface Media {
  _id: number;
  imdbId?: string;
  tmdbId?: number;
  tagline?: string;
  title?: string;
  originalTitle?: string;
  overview?: string;
  posterPath?: string;
  backdropPath?: string;
  movie?: Movie;
  tvShow?: TVShow;
  videos: Video[];
  credits: Credit[];
  genres: string[];
  popularity?: number;
  isPublic: number;
  addedBy: number;
  releaseDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  runtime?: number;
  releaseDate?: string;
  status?: string;
  adult?: boolean;
}

export interface TVShow {
  episodeRuntime?: number[];
  firstAirDate?: string;
  lastAirDate?: string;
  status?: string;
  seasonCount?: number;
  seasons: Season[];
}

export interface Season {
  airDate?: string;
  seasonNumber?: number;
  episodeCount?: number;
  name?: string;
  overview?: string;
  posterPath?: string;
  isPublic: boolean;
  isAdded: boolean;
  episodes: Episode[];
}

export interface Episode {
  episodeNumber?: number;
  runtime?: number;
  name?: string;
  overview?: string;
  airDate?: string;
  stillPath?: string;
  isPublic: boolean;
  isAdded: boolean;
}

export interface Video {
  _id: number;
  title?: string;
  site: string;
  key: string;
  type: string;
}

export interface Credit {
  tmdbId: string;
  name?: string;
  originalName?: string;
  profilePath?: string;
  department?: string;
  crew?: Crew;
  cast?: Cast;
}

export interface Crew {
  job?: string;
}

export interface Cast {
  character?: string;
}
