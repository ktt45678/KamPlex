import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { JoinModule } from '../../modules/pipes/join/join.module'
import { MediaListComponent } from './media-list.component';


@NgModule({
  declarations: [MediaListComponent],
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    LazyLoadImageModule,
    JoinModule
  ],
  exports: [MediaListComponent]
})
export class MediaListModule { }
