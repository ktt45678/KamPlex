import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isDynamicNavbar: boolean = false;
  isMenuExpanded: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.isMenuExpanded || !this.isDynamicNavbar) { return; }
    const element = document.querySelector('.navbar');
    if (window.pageYOffset > element!.clientHeight) {
      element!.classList.add('bg-dark');
    } else if (!this.isMenuExpanded) {
      element!.classList.remove('bg-dark');
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
