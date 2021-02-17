import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { HeaderModule } from './shared/header/header.module';
import { FooterModule } from './shared/footer/footer.module';
import { JoinModule } from './modules/pipes/join/join.module';
import { ErrorInterceptor } from './modules/interceptors/error.interceptor';
import { HttpErrorInterceptor } from './modules/interceptors/http-error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeLayoutComponent,
    ContentLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    BadgeModule,
    ProgressSpinnerModule,
    LazyLoadImageModule,
    HeaderModule,
    FooterModule,
    JoinModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
