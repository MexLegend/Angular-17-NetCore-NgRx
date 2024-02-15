import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from '@services/storage/local-storage.service';
import { HttpRequest } from '@angular/common/http';
import { IDataUser } from '@models/user.interface';
import { KEY_STORAGE } from '@models/storage.enum';
import { URL_AUTH_REFRESH } from '@constants/api-urls.constant';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenManageService {
  private _isRefreshing = false;
  private _localStorageService = inject(LocalStorageService);

  get isRefreshing() {
    return this._isRefreshing;
  }

  set isRefreshing(value) {
    this._isRefreshing = value;
  }

  addTokenHeader(request: HttpRequest<unknown>) {
    const user = this.getDataUser();
    const token =
      request.url === URL_AUTH_REFRESH ? user.refreshToken : user.accessToken;

    return request
    // .clone({
    //   headers: request.headers.set('Authorization', `Bearer ${token}`),
    // });
  }

  updateTokens(token: string, refreshToken: string) {
    const user = this.getDataUser();
    user.accessToken = token;
    user.refreshToken = refreshToken;
    this._localStorageService.setItem(KEY_STORAGE.DATA_USER, user);
  }

  getDataUser() {
    return this._localStorageService.getItem<IDataUser>(KEY_STORAGE.DATA_USER)!;
  }
}
