import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaDetailsRoutingModule } from './media-details-routing.module';
import { MediaDetailsComponent } from './media-details.component';


@NgModule({
  declarations: [MediaDetailsComponent],
  imports: [
    CommonModule,
    MediaDetailsRoutingModule
  ]
})
export class MediaDetailsModule { }
