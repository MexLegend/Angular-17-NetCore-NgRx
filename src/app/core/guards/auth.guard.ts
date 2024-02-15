import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MasterService } from '@services/master.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(MasterService);
  const router = inject(Router);

  if (service.haveAccess()) {
    return true;
  }

  alert('unauthorized access');
  router.navigate(['/']);
  return false;
};
