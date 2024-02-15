import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { RefreshTokenManageService } from '../services/auth/refresh-token-manager.service';
import { Router } from '@angular/router';
import { EMPTY, catchError, concatMap, finalize, throwError } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const refreshTokenManageService = inject(RefreshTokenManageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        console.log('****REQUESTING NEW REFRESH TOKEN');
        refreshTokenManageService.isRefreshing = true;

        return authService.refreshToken().pipe(
          finalize(() => (refreshTokenManageService.isRefreshing = false)),
          concatMap(({ accessToken, refreshToken }) => {
            refreshTokenManageService.updateTokens(accessToken, refreshToken);
            console.log('****TOKEN UPDATED****');

            const requestClone = refreshTokenManageService.addTokenHeader(req);
            return next(requestClone);
          }),
          catchError(() => {
            console.log('****ERROR WHILE UPDATING TOKEN****');
            router.navigateByUrl('/');
            return EMPTY;
          })
        );
      }

      return throwError(() => error);
    })
  );
};
