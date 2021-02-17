import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { MediaFetch } from '../../modules/interfaces/media-fetch';
import { Media } from '../../modules/interfaces/media';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MediaService]
})
export class HomeComponent implements OnInit {
  movieList!: MediaFetch;
  featuredShow?: Media;

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaService.fetchMedia({ type: 'movie', limit: 12, sort: 'createdAt:-1' }).subscribe(data => {
      this.movieList = data;
      this.featuredShow = data.totalResults > 0 ? data.results[0] : undefined;
    });
  }

}
