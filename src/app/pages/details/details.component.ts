import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  seasonPlural = { '=0': 'No season', '=1': '# season', 'other': '# seasons' };

  constructor(private route: ActivatedRoute, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaId = Number(this.route.snapshot.paramMap.get('id'));
    this.mediaService.getMediaDetails(this.mediaId).subscribe(data => {
      this.media = data;
    });
  }

  imageClick(index: number) {
    this.activeVideoIndex = index;
    this.displayVideo = true;
  }

}
