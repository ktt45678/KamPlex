export interface IMedia {
  _id: number;
  imdbId?: string;
  tmdbId?: number;
  tagline?: string;
  title?: string;
  originalTitle?: string;
  overview?: string;
  posterPath?: string;
  backdropPath?: string;
  movie?: IMovie;
  tvShow?: ITVShow;
  videos: IVideo[];
  credits: ICredit[];
  genres: string[];
  popularity?: number;
  isPublic: number;
  addedBy: number;
  releaseDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMovie {
  runtime?: number;
  releaseDate?: string;
  status?: string;
  adult?: boolean;
}

export interface ITVShow {
  episodeRuntime?: number[];
  firstAirDate?: string;
  lastAirDate?: string;
  status?: string;
  seasonCount?: number;
  seasons: ISeason[];
}

export interface ISeason {
  airDate?: string;
  seasonNumber?: number;
  episodeCount?: number;
  name?: string;
  overview?: string;
  posterPath?: string;
  isPublic: boolean;
  isAdded: boolean;
  episodes: IEpisode[];
}

export interface IEpisode {
  episodeNumber?: number;
  runtime?: number;
  name?: string;
  overview?: string;
  airDate?: string;
  stillPath?: string;
  isPublic: boolean;
  isAdded: boolean;
}

export interface IVideo {
  _id: number;
  title?: string;
  site: string;
  key: string;
  type: string;
}

export interface ICredit {
  tmdbId: string;
  name?: string;
  originalName?: string;
  profilePath?: string;
  department?: string;
  crew?: ICrew;
  cast?: ICast;
}

export interface ICrew {
  job?: string;
}

export interface ICast {
  character?: string;
}
