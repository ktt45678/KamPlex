import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MessageService } from 'primeng/api';

import { AppInitializer } from './modules/initializers/app.initializer';
import { HeaderModule } from './shared/header/header.module';
import { FooterModule } from './shared/footer/footer.module';
import { FeaturedModule } from './shared/featured/featured.module';
import { MediaFilterModule } from './shared/media-filter/media-filter.module';
import { ErrorInterceptor } from './modules/interceptors/error.interceptor';
import { RequestInterceptor } from './modules/interceptors/request.interceptor';
import { HttpErrorInterceptor } from './modules/interceptors/http-error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeLayoutComponent,
    ContentLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    ProgressSpinnerModule,
    PaginatorModule,
    MessageModule,
    ToastModule,
    SkeletonModule,
    LazyLoadImageModule,
    HeaderModule,
    FooterModule,
    FeaturedModule,
    MediaFilterModule
  ],
  providers: [
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializer,
      deps: [AuthenticationService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
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
