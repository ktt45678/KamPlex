import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  providers: [MediaService]
})
export class WatchComponent implements OnInit {
  isPlayable: boolean = false;
  player!: Plyr;
  videoSources: Plyr.Source[] = [];
  videoOptions: Plyr.Options = {
    controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
    settings: ['captions', 'quality', 'speed', 'loop'],
    autoplay: true
  }
  mediaId!: number;

  constructor(private route: ActivatedRoute, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaId = Number(this.route.snapshot.paramMap.get('id'));
    this.mediaService.getStreamUrls(this.mediaId).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.videoSources.push({
          src: data[i].url,
          size: data[i].quality,
          type: data[i].mimeType,
          provider: 'html5'
        });
      }
      this.isPlayable = true;
    });
  }

}
