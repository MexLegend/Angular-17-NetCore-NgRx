import { HttpInterceptorFn } from '@angular/common/http';
import {
  URL_AUTH_REFRESH,
  URL_AUTH_SIGNIN,
} from '@constants/api-urls.constant';
import { RefreshTokenManageService } from '@services/auth/refresh-token-manager.service';
import { inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url === URL_AUTH_SIGNIN) {
    return next(req);
  }

  const refreshTokenManageService = inject(RefreshTokenManageService);

  if (req.url === URL_AUTH_REFRESH) {
    const requestClone = refreshTokenManageService.addTokenHeader(req);
    return next(requestClone);
  }

  //  Refresh Token in Process, Reject Request
  if (refreshTokenManageService.isRefreshing) {
    return EMPTY;
  }

  const dataUser = refreshTokenManageService.getDataUser();

  if (!dataUser || !dataUser.accessToken) {
    inject(Router).navigateByUrl('/');
    return EMPTY;
  }

  const requestClone = refreshTokenManageService.addTokenHeader(req);

  return next(requestClone);
};
