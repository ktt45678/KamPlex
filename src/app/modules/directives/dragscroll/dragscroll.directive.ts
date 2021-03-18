import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragscroll]'
})
export class DragscrollDirective {
  isDown = false;
  startX = 0;
  scrollLeft = 0;

  constructor(private element: ElementRef) { }

  @HostBinding('style.cursor')
  cursor:string = 'grab';

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    this.isDown = true;
    this.startX = event.pageX - this.element.nativeElement.offsetLeft;
    this.scrollLeft = this.element.nativeElement.scrollLeft;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    if (!this.isDown) return;
    event.preventDefault();
    const x = event.pageX - this.element.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1;
    this.element.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onMouseUp(event: any) {
    this.isDown = false;
  }
}
