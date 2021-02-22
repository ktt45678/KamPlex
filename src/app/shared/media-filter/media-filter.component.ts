import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-filter',
  templateUrl: './media-filter.component.html',
  styleUrls: ['./media-filter.component.scss']
})
export class MediaFilterComponent implements OnInit {
  @Input() selectedGenre?: string;
  @Input() selectedSort?: string;
  sortOptions = [
    { label: 'Latest', value: 'createdAt:-1' },
    { label: 'Oldest', value: 'createdAt:1' },
    { label: 'Date (Ascending)', value: 'releaseDate:1' },
    { label: 'Date (Descending)', value: 'releaseDate:-1' },
    { label: 'Title (A-Z)', value: 'title:1' },
    { label: 'Title (Z-A)', value: 'title:-1' }
  ];
  genreOptions = [
    { label: 'All', value: null },
    { label: 'Action', value: 'Action' },
    { label: 'Adventure', value: 'Adventure' },
    { label: 'Animation', value: 'Animation' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Crime', value: 'Crime' },
    { label: 'Documentary', value: 'Documentary' },
    { label: 'Drama', value: 'Drama' },
    { label: 'Family', value: 'Family' },
    { label: 'Fantasy', value: 'Fantasy' },
    { label: 'History', value: 'History' },
    { label: 'Horror', value: 'Horror' },
    { label: 'Music', value: 'Music' },
    { label: 'Mystery', value: 'Mystery' },
    { label: 'Romance', value: 'Romance' },
    { label: 'War', value: 'War' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  filterBy(event: any): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { genre: event.value }, queryParamsHandling: 'merge', fragment: 'page' });
  }

  sortBy(event: any): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { sort: event.value }, queryParamsHandling: 'merge', fragment: 'page' });
  }

}
