import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { MediaService } from '../../services/media.service';
import { Media } from '../../modules/interfaces/media';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [MediaService]
})
export class DetailsComponent implements OnInit {
  mediaId!: number;
  media!: Media;
  displayVideo: boolean = false;
  activeVideoIndex: number = 0;
  youtubeUrl = 'https://www.youtube.com/embed/';
  youtubeThumbnailUrl = 'https://img.youtube.com/vi/';
  seasonPlural = { '=0': 'No seasons', '=1': '# season', 'other': '# seasons' };
  seasonName = { '=0': 'Specials', 'other': 'Season #' };

  constructor(private route: ActivatedRoute, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaId = Number(this.route.snapshot.paramMap.get('id'));
    this.mediaService.getMediaDetails(this.mediaId).pipe(map(data => {
      data.videos = data.videos.filter(v => v.site.toLowerCase() === 'youtube');
      return data;
    })).subscribe(data => {
      this.media = data;
    });
  }

  viewVideo(index: number) {
    this.activeVideoIndex = index;
    this.displayVideo = true;
  }

}
