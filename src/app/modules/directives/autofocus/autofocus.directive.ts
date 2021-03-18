import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.element.nativeElement.focus({ preventScroll: true });
  }

}
