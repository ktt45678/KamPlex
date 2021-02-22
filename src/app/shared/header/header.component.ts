import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isDynamicNavbar: boolean = false;
  isMenuExpanded: boolean = false;
  currentPageYOffset: number = window.pageYOffset;

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

  onExpandMenu() {
    if (!this.isDynamicNavbar) { return; }
    const element = document.querySelector('.navbar');
    if (!this.isMenuExpanded) {
      element!.classList.add('bg-dark');
      this.isMenuExpanded = true;
    } else {
      element!.classList.remove('bg-dark');
      this.isMenuExpanded = false;
      this.onWindowScroll();
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
