import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { FeaturedModule } from '../../shared/featured/featured.module';
import { MediaFilterModule } from '../../shared/media-filter/media-filter.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';


@NgModule({
  declarations: [MovieComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    ProgressSpinnerModule,
    PaginatorModule,
    SkeletonModule,
    LazyLoadImageModule,
    FeaturedModule,
    MediaFilterModule
  ]
})
export class MovieModule { }
