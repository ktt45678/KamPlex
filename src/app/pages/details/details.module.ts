import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { JoinModule } from '../../modules/pipes/join/join.module';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';


@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    ButtonModule,
    BadgeModule,
    ProgressSpinnerModule,
    LazyLoadImageModule,
    JoinModule
  ]
})
export class DetailsModule { }
