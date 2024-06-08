import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () => import('./store.page').then((m) => m.StorePage),
  },  {
    path: 'item-group',
    loadComponent: () => import('./item-group/item-group.page').then( m => m.ItemGroupPage)
  },

];
