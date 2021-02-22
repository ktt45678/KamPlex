import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MediaService } from '../../services/media.service';
import { MediaFetch } from '../../modules/interfaces/media-fetch';
import { Media } from '../../modules/interfaces/media';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
  providers: [MediaService]
})
export class TvComponent implements OnInit {
  pageLoading: boolean = false;
  mediaList!: MediaFetch;
  featuredShow?: Media;
  itemLimit: number = 30;
  pageFirst: number = 0;
  selectedGenre?: string;
  selectedSort?: string;
  seasonPlural = { '=0': 'No seasons', '=1': '# season', 'other': '# seasons' };

  constructor(private route: ActivatedRoute, private router: Router, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaService.fetchMedia({ type: 'tv', page: 1, limit: 1, sort: 'createdAt:-1' }).subscribe(data => {
      this.featuredShow = data.totalResults > 0 ? data.results[0] : undefined;
    });
    this.route.queryParams.subscribe(p => {
      this.selectedGenre = p.genre || undefined;
      this.selectedSort = p.sort || 'createdAt:-1';
      this.loadPage(p.page || 1);
    });
  }

  paginate(event: any): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { page: event.page + 1 }, queryParamsHandling: 'merge', fragment: 'page' });
  }

  loadPage(page: number): void {
    this.pageLoading = true;
    this.mediaService.fetchMedia({ type: 'tv', genre: this.selectedGenre, sort: this.selectedSort, page, limit: this.itemLimit }).subscribe(data => {
      this.mediaList = data;
      this.pageFirst = this.itemLimit * (page - 1);
      this.pageLoading = false;
    });
  }

  trackMedia(index: number, item: any) {
    return item?._id || null;
  }

}
