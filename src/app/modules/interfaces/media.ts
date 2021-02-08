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
  movie?: {
    runtime?: number,
    releaseDate?: string,
    status?: string,
    adult?: boolean
  };
  tvShow?: {
    episodeRuntime?: number[],
    firstAirDate?: string,
    lastAirDate?: string,
    status?: string,
    seasonCount?: number,
    seasons: [{
      airDate?: string,
      seasonNumber?: number,
      episodeCount?: number,
      name?: string,
      overview?: string,
      posterPath?: string,
      isPublic: boolean,
      isAdded: boolean,
      episodes?: [{
        episodeNumber?: number,
        runtime?: number,
        name?: string,
        overview?: string,
        airDate?: string,
        stillPath?: string,
        isPublic: boolean,
        isAdded: boolean
      }]
    }]
  };
  video: [{
    _id: number,
    title?: string,
    site: string,
    key: string,
    type: string
  }];
  credits: [{
    tmdbId: string,
    name?: string,
    originalName?: string,
    profilePath?: string,
    department?: string,
    crew?: {
      job?: string
    },
    cast?: {
      character?: string
    }
  }];
  genres: string[];
  popularity?: number;
  isPublic: number;
  addedBy: number;
  releaseDate?: string;
  createdAt: string;
  updatedAt: string;
}
