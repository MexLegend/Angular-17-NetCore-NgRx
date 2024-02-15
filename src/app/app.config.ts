import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { authInterceptor } from 'core/interceptors/auth.interceptor';
import { authErrorInterceptor } from 'core/interceptors/auth-error.interceptor';
import { provideEffects } from '@ngrx/effects';
import { customerReducer } from '@store/customer/customer.reducer';
import { CustomerEffects } from '@store/customer/customer.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor, authErrorInterceptor])
    ),
    provideStore({ customer: customerReducer }),
    provideEffects(CustomerEffects),
  ],
};
