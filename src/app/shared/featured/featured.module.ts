import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { JoinModule } from '../../modules/pipes/join/join.module';
import { FeaturedComponent } from './featured.component';


@NgModule({
  declarations: [FeaturedComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    BadgeModule,
    LazyLoadImageModule,
    JoinModule
  ],
  exports: [FeaturedComponent]
})
export class FeaturedModule { }
