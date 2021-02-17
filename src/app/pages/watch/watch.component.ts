import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../../services/media.service';
import { MediaStream } from '../../modules/interfaces/media-stream';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  providers: [MediaService]
})
export class WatchComponent implements OnInit {
  isPlayable: boolean = false;
  mediaId!: number;
  player!: Plyr;
  videoSources: Plyr.Source[] = [];
  videoOptions: Plyr.Options = {
    controls: ['play-large', 'play', 'rewind', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
    settings: ['captions', 'quality', 'speed', 'loop'],
    autoplay: true
  }

  constructor(private route: ActivatedRoute, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaId = Number(this.route.snapshot.paramMap.get('id'));
    this.mediaService.getStreamUrls(this.mediaId).subscribe(data => {
      this.loadVideos(data);
      this.isPlayable = true;
    });
  }

  private loadVideos(source: MediaStream[]): void {
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

}
