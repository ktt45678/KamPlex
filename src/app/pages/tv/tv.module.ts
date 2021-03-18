import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { FeaturedModule } from '../../shared/featured/featured.module';
import { MediaFilterModule } from '../../shared/media-filter/media-filter.module';
import { MediaListModule } from '../../shared/media-list/media-list.module';
import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv.component';


@NgModule({
  declarations: [TvComponent],
  imports: [
    CommonModule,
    TvRoutingModule,
    ProgressSpinnerModule,
    PaginatorModule,
    SkeletonModule,
    LazyLoadImageModule,
    FeaturedModule,
    MediaFilterModule,
    MediaListModule
  ]
})
export class TvModule { }
