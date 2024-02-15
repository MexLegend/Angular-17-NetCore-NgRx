import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  URL_AUTH_REFRESH,
  URL_AUTH_SIGNIN,
} from '@constants/api-urls.constant';
import {
  IResponseRefreshToken,
  IResponseSingIn,
  ISignIn,
} from '@models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);

  login(userData: ISignIn) {
    return this._http.post<IResponseSingIn>(URL_AUTH_SIGNIN, {
      username: userData.username,
      password: userData.password,
    });
  }

  refreshToken() {
    return this._http.get<IResponseRefreshToken>(URL_AUTH_REFRESH);
  }
}
