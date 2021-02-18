import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { JoinModule } from '../../modules/pipes/join/join.module';
import { SafeModule } from '../../modules/pipes/safe/safe.module';
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
    DialogModule,
    GalleriaModule,
    LazyLoadImageModule,
    JoinModule,
    SafeModule
  ]
})
export class DetailsModule { }
