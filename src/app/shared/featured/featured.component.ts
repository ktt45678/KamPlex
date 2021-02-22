import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Media } from '../../modules/interfaces/media';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() media?: Media;
  @Input() isDetailPage: boolean = false;
  isPlayable: boolean = true;
  seasonPlural = { '=0': 'No season', '=1': '# season', 'other': '# seasons' };

  constructor(private router: Router) { }

  ngOnInit(): void {
    const hasEpisode = this.media?.tvShow?.seasons?.length && this.media?.tvShow?.seasons[0].episodes.length;
    if (this.media?.tvShow && !hasEpisode) {
      this.isPlayable = false;
    }
  }

  playMedia(): void {
    if (this.media?.movie) {
      this.router.navigate(['watch', this.media?._id]);
    } else if (this.isPlayable) {
      const season = this.media?.tvShow?.seasons[0].seasonNumber;
      const episode = this.media?.tvShow?.seasons[0].episodes[0].episodeNumber;
      this.router.navigate(['watch', this.media?._id], { queryParams: { s: season, e: episode } });
    }
  }

}
