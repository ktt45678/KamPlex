import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { MediaService } from '../../services/media.service';
import { Media, Episode } from '../../modules/interfaces/media';
import { MediaStream } from '../../modules/interfaces/media-stream';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  providers: [MediaService]
})
export class WatchComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  isPlayable: boolean = false;
  displaySidebar: boolean = false;
  showControls: boolean = false;
  timeout!: any;
  mediaId!: number;
  season!: number;
  episode!: number;
  media!: Media;
  currentEpisode?: Episode;
  videoSources: Plyr.Source[] = [];
  videoOptions: Plyr.Options = {
    controls: ['play-large', 'play', 'rewind', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
    settings: ['captions', 'quality', 'speed', 'loop'],
    autoplay: true
  }

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private ngZone: NgZone, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.subscription.add(combineLatest([this.route.params, this.route.queryParams]).pipe(map(([params, qparams]) => {
      this.isPlayable = false;
      this.mediaId = Number(params.id);
      this.season = Number(qparams.s);
      this.episode = Number(qparams.e);
      this.getStreamUrls();
      this.getMedia();
    })).subscribe());
  }

  getStreamUrls(): void {
    const srteamParams = this.season && this.episode ? { season: this.season, episode: this.episode } : {};
    this.mediaService.getStreamUrls(this.mediaId, srteamParams).subscribe(data => {
      this.loadVideos(data);
      this.isPlayable = true;
    });
  }

  getMedia(): void {
    const mediaParams = { exclusions: 'credits,videos,genres,overview' };
    this.mediaService.getMediaDetails(this.mediaId, mediaParams).subscribe(data => {
      this.media = data;
      if (data.tvShow) {
        const currentSeason = data.tvShow.seasons.find(s => s.seasonNumber === this.season);
        this.currentEpisode = currentSeason?.episodes.find(e => e.episodeNumber === this.episode);
      }
    });
  }

  nextEpisode(): void {
    if (this.media && this.media.tvShow) {
      const seasonIndex = this.media.tvShow.seasons.findIndex(s => s.seasonNumber === this.season);
      const episodeIndex = this.media.tvShow.seasons[seasonIndex].episodes.findIndex(e => e.episodeNumber === this.episode);
      if (seasonIndex > -1 && episodeIndex > -1 && this.media.tvShow.seasons[seasonIndex].episodes[episodeIndex + 1]) {
        const targetSeason = this.media.tvShow.seasons[seasonIndex];
        const targetEpisode = this.media.tvShow.seasons[seasonIndex].episodes[episodeIndex + 1];
        this.router.navigate([], { relativeTo: this.route, queryParams: { s: targetSeason.seasonNumber, e: targetEpisode.episodeNumber }, queryParamsHandling: 'merge' });
      } else if (this.media.tvShow.seasons[seasonIndex + 1]?.episodes[0]) {
        const targetSeason = this.media.tvShow.seasons[seasonIndex + 1];
        const targetEpisode = this.media.tvShow.seasons[seasonIndex].episodes[0];
        this.router.navigate([], { relativeTo: this.route, queryParams: { s: targetSeason.seasonNumber, e: targetEpisode.episodeNumber }, queryParamsHandling: 'merge' });
      }
    }
  }

  loadVideos(source: MediaStream[]): void {
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

  handleTouchStart(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.showControls = true;
  }

  handleTouchEnd(): void {
    this.timeout = setTimeout(() => {
      this.showControls = false;
    }, 3000);
  }

  back(): void {
    this.location.back();
  }

  trackMedia(index: number, item: any) {
    return item?._id || null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
