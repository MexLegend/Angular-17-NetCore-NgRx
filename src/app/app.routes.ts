import { Routes } from '@angular/router';
import { authGuard } from 'core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@pages/home/home.component').then((comp) => comp.HomeComponent),
  },
  {
    path: 'customers',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@pages/customer/customer.component').then(
        (comp) => comp.CustomerComponent
      ),
  },
];
