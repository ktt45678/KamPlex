import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AutoCompleteModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
