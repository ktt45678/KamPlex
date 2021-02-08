import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaDetailsComponent } from './media-details.component';

const routes: Routes = [
  {
    path: '',
    component: MediaDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaDetailsRoutingModule { }
