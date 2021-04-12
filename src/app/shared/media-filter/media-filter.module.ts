import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { MediaFilterComponent } from './media-filter.component';


@NgModule({
  declarations: [MediaFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule
  ],
  exports: [MediaFilterComponent]
})
export class MediaFilterModule { }
