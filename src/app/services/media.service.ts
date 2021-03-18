import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IMediaFetch } from '../modules/interfaces/media-fetch';
import { IMediaStream } from '../modules/interfaces/media-stream';
import { IMedia } from '../modules/interfaces/media';

@Injectable()
export class MediaService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.apiUrl;

  fetchMedia(params: any = {}) {
    return this.http.get<IMediaFetch>(`${this.apiUrl}/media/fetch`, { params });
  }

  getLatestMedia(params: any = {}) {
    return this.http.get<IMedia>(`${this.apiUrl}/media/latest`, { params });
  }

  getMediaDetails(id: number, params: any = {}) {
    return this.http.get<IMedia>(`${this.apiUrl}/media/details/${id}`, { params });
  }

  getStreamUrls(id: number, params: any = {}) {
    return this.http.get<IMediaStream[]>(`${this.apiUrl}/media/stream/${id}`, { params });
  }

  findNextEpisode(media: IMedia, currentSeason: number, currentEpisode: number): any {
    if (media && media.tvShow) {
      const seasonIndex = media.tvShow.seasons.findIndex(s => s.seasonNumber === currentSeason);
      if (seasonIndex > -1) {
        const episodeIndex = media.tvShow.seasons[seasonIndex].episodes.findIndex(e => e.episodeNumber === currentEpisode);
        if (episodeIndex > -1 && media.tvShow.seasons[seasonIndex].episodes[episodeIndex + 1]) {
          return { s: media.tvShow.seasons[seasonIndex].seasonNumber, e: media.tvShow.seasons[seasonIndex].episodes[episodeIndex + 1].episodeNumber }
        } else if (media.tvShow.seasons[seasonIndex + 1]?.episodes[0]) {
          return { s: media.tvShow.seasons[seasonIndex + 1].seasonNumber, e: media.tvShow.seasons[seasonIndex].episodes[0].episodeNumber }
        }
      }
    }
  }
}
