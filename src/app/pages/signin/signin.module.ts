import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SigninRoutingModule } from './signin-routing.module';
import { AutofocusModule } from '../../modules/directives/autofocus/autofocus.module';
import { SigninComponent } from './signin.component';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    AutofocusModule
  ]
})
export class SigninModule { }
