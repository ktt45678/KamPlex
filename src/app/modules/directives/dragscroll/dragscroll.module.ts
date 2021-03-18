import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragscrollDirective } from './dragscroll.directive';



@NgModule({
  declarations: [DragscrollDirective],
  imports: [
    CommonModule
  ],
  exports: [DragscrollDirective]
})
export class DragscrollModule { }
