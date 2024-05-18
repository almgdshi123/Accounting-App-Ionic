import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'weather',
    loadComponent: () => import('./page/countries/countries.page').then( m => m.countriesPage)
  },
  {
    path: 'contries/:id',
    loadComponent: () => import('./page/countries/contries-detail/contries-detail.page').then( m => m.ContriesDetailPage)
  }
  
,  {
    path: '404',
    loadComponent: () => import('./page/error-page/error-page.page').then( m => m.ErrorPagePage)
  },
  {
    path: '**',
    redirectTo: '404'
  },

];
