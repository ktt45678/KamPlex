import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PlyrModule } from 'ngx-plyr';

import { WatchRoutingModule } from './watch-routing.module';
import { WatchComponent } from './watch.component';


@NgModule({
  declarations: [WatchComponent],
  imports: [
    CommonModule,
    WatchRoutingModule,
    ButtonModule,
    ProgressSpinnerModule,
    SidebarModule,
    TabViewModule,
    LazyLoadImageModule,
    PlyrModule
  ]
})
export class WatchModule { }
