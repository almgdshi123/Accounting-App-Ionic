import { Routes } from '@angular/router';
import { authenticationGuard } from './Services/account/authentication.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.page').then((m) => m.HomePage),
    canActivate:[authenticationGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'weather',
    loadComponent: () => import('./page/countries/countries.page').then( m => m.countriesPage)
   , canActivate:[authenticationGuard]

  },
  {
    path: 'contrie/:id',
    loadComponent: () => import('./page/countries/contries-detail/contries-detail.page').then( m => m.ContriesDetailPage)
  },
  
  {
    path: 'login',
    loadComponent: () => import('./page/account/login/login.page').then( m => m.LoginPage)
  },
  {
    path:'store',
    loadChildren:()=> import('./page/store/store.routes').then(m =>m.routes),
    canActivate:[authenticationGuard]

  }
  ,
    {
    path: '404',
    loadComponent: () => import('./page/error-page/error-page.page').then( m => m.ErrorPagePage)
  },
  {
    path: '**',
    redirectTo: '404'
  },
 
 

];
