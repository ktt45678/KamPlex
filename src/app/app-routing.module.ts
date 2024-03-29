import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'tv',
        loadChildren: () => import('./pages/tv/tv.module').then(m => m.TvModule)
      },
      {
        path: 'movie',
        loadChildren: () => import('./pages/movie/movie.module').then(m => m.MovieModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule)
      }
    ]
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'signin',
        loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
      }
    ]
  },
  {
    path: 'watch/:id',
    loadChildren: () => import('./pages/watch/watch.module').then(m => m.WatchModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
