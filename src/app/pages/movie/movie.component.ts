import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MediaService } from '../../services/media.service';
import { IMediaFetch } from '../../modules/interfaces/media-fetch';
import { IMedia } from '../../modules/interfaces/media';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  providers: [MediaService]
})
export class MovieComponent implements OnInit {
  pageLoading: boolean = false;
  mediaList!: IMediaFetch;
  featuredShow!: IMedia;
  itemLimit: number = 30;
  pageFirst: number = 0;
  selectedGenre?: string;
  selectedSort?: string;

  constructor(private route: ActivatedRoute, private router: Router, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaService.getLatestMedia({ type: 'movie' }).subscribe(data => {
      this.featuredShow = data;
    });
    this.route.queryParams.subscribe(p => {
      this.selectedGenre = p.genre || undefined;
      this.selectedSort = p.sort || 'createdAt:-1';
      this.loadPage(Number(p.page) || 1);
    });
  }

  paginate(event: any): void {
    if (!this.route.snapshot.queryParamMap.get('page') && !event.page) { return; }
    this.router.navigate([], { queryParams: { page: event.page + 1 }, queryParamsHandling: 'merge', fragment: 'page' });
  }

  loadPage(page: number): void {
    this.pageLoading = true;
    this.mediaService.fetchMedia({ type: 'movie', genre: this.selectedGenre, sort: this.selectedSort, page, limit: this.itemLimit }).subscribe(data => {
      this.mediaList = data;
      this.pageFirst = this.itemLimit * (page - 1);
      this.pageLoading = false;
    });
  }

}
