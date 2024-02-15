import { FormControl } from '@angular/forms';
import { IDataUser } from './user.interface';

export interface ISignInForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

export interface ISignIn {
  username: string;
  password: string;
}

export interface IResponseSingIn extends IDataUser {}

export interface IResponseRefreshToken {
  accessToken: string;
  refreshToken: string;
}
