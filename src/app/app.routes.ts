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
      import('@pages/customer/customers-list/customers-list.component').then(
        (comp) => comp.CustomersListComponent
      ),
  },
  {
    path: 'customer/add',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@pages/customer/add-customer/add-customer.component').then(
        (comp) => comp.AddCustomerComponent
      ),
  },
  {
    path: 'customer/edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@pages/customer/add-customer/add-customer.component').then(
        (comp) => comp.AddCustomerComponent
      ),
  },
];
