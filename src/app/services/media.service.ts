import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MediaFetch } from '../modules/interfaces/media-fetch';
import { MediaStream } from '../modules/interfaces/media-stream';

@Injectable()
export class MediaService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.apiUrl;

  fetchMedia(params = {}) {
    return this.http.get<MediaFetch>(`${this.apiUrl}/media/fetch`, { params });
  }

  getStreamUrls(id: number, params = {}) {
    return this.http.get<MediaStream[]>(`${this.apiUrl}/media/stream/${id}`, { params });
  }
}
