import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { MediaService } from '../../services/media.service';
import { DestroyService } from 'src/app/services/destroy.service';
import { IMedia, IEpisode } from '../../modules/interfaces/media';
import { IMediaStream } from '../../modules/interfaces/media-stream';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  providers: [MediaService, DestroyService]
})
export class WatchComponent implements OnInit {
  isPlayable: boolean = false;
  displaySidebar: boolean = false;
  showControls: boolean = false;
  mediaId!: number;
  season!: number;
  episode!: number;
  media!: IMedia;
  currentEpisode?: IEpisode;
  videoSources: Plyr.Source[] = [];
  videoOptions: Plyr.Options = {
    controls: ['play-large', 'play', 'rewind', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
    settings: ['captions', 'quality', 'speed', 'loop'],
    autoplay: true
  };
  seasonName = { '=0': 'Specials', 'other': 'Season #' };

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private mediaService: MediaService, private readonly destroy$: DestroyService) { }

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams]).pipe(map(([params, qparams]) => {
      this.isPlayable = false;
      this.mediaId = Number(params.id);
      this.season = Number(qparams.s);
      this.episode = Number(qparams.e);
      this.getStreamUrls();
      this.getMedia();
    }), takeUntil(this.destroy$)).subscribe();
  }

  getStreamUrls(): void {
    const srteamParams = !(isNaN(this.season) && isNaN(this.episode)) ? { season: this.season, episode: this.episode } : {};
    this.mediaService.getStreamUrls(this.mediaId, srteamParams).subscribe(data => {
      this.loadVideos(data);
      this.isPlayable = true;
    });
  }

  getMedia(): void {
    const mediaParams = { fields: '>credits,videos,genres,overview' };
    this.mediaService.getMediaDetails(this.mediaId, mediaParams).subscribe(data => {
      this.media = data;
      if (data.tvShow) {
        const currentSeason = data.tvShow.seasons.find(s => s.seasonNumber === this.season);
        this.currentEpisode = currentSeason?.episodes.find(e => e.episodeNumber === this.episode);
      }
    });
  }

  nextEpisode(): void {
    const qparams = this.mediaService.findNextEpisode(this.media, this.season, this.episode);
    if (qparams) {
      this.router.navigate([], { queryParams: qparams, queryParamsHandling: 'merge' });
    }
  }

  loadVideos(source: IMediaStream[]): void {
    this.videoSources = [];
    let i = source.length;
    while (i--) {
      this.videoSources.push({
        src: source[i].url,
        size: source[i].quality,
        type: source[i].mimeType,
        provider: 'html5'
      });
    }
  }

  back(): void {
    this.location.back();
  }

  trackMedia(index: number, item: any) {
    return item?._id || null;
  }

}
