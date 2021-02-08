import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlyrModule } from 'ngx-plyr';

import { WatchRoutingModule } from './watch-routing.module';
import { WatchComponent } from './watch.component';


@NgModule({
  declarations: [WatchComponent],
  imports: [
    CommonModule,
    WatchRoutingModule,
    PlyrModule
  ]
})
export class WatchModule { }
