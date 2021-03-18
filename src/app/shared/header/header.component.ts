import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DestroyService } from 'src/app/services/destroy.service';
import { MediaService } from 'src/app/services/media.service';
import { IMediaFetch } from '../../modules/interfaces/media-fetch';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MediaService, DestroyService]
})
export class HeaderComponent implements OnInit {
  @Input() isDynamicNavbar: boolean = false;
  searchQuery?: string;
  searchList?: IMediaFetch;
  isMenuExpanded: boolean = false;
  currentPageYOffset: number = window.pageYOffset;
  seasonPlural = { '=0': 'No seasons', '=1': '# season', 'other': '# seasons' };

  constructor(private router: Router, private mediaService: MediaService) {}

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.isMenuExpanded || !this.isDynamicNavbar) { return; }
    const element = document.querySelector('.navbar');
    if (window.pageYOffset > this.currentPageYOffset) {
      element!.classList.add('navbar-hidden');
    } else if (!this.isMenuExpanded) {
      element!.classList.remove('navbar-hidden');
    }
  }

  onMenuExpand() {
    if (!this.isDynamicNavbar) { return; }
    const element = document.querySelector('.navbar');
    const navToggler = document.querySelector('.navbar-toggler');
    if (navToggler?.getAttribute('aria-expanded') === 'true') {
      element!.classList.add('bg-dark');
      this.isMenuExpanded = true;
    } else {
      element!.classList.remove('bg-dark');
      this.isMenuExpanded = false;
      this.onWindowScroll();
    }
  }

  handleSearch(event: any): void {
    const query = encodeURIComponent(event.query || '');
    this.mediaService.fetchMedia({ query, limit: 10, page: 1 }).subscribe(data => {
      this.searchList = data;
    });
  }

  handleSearchKeyUp(event: any): void {
    if (event.keyCode === 13 && this.searchQuery) {
      //this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

}
