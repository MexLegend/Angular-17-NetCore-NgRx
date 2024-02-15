import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { LocalStorageService } from '@services/storage/local-storage.service';
import { IResponseSingIn, ISignInForm } from '@models/auth.interface';
import { KEY_STORAGE } from '@models/storage.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatToolbar, MatIconButton, MatButton, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _localStorageService = inject(LocalStorageService);

  form!: FormGroup<ISignInForm>;

  constructor() {
    this.form = this._fb.group<ISignInForm>({
      username: this._fb.control('Armando', Validators.required),
      password: this._fb.control('1234567890', Validators.required),
    });
  }

  login() {
    if (this.form.valid) {
      // const { username, password } = this.form.getRawValue();
      const dummyUser: IResponseSingIn = {
        id: '1',
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token',
      };

      this._localStorageService.setItem(KEY_STORAGE.DATA_USER, dummyUser);
      this._router.navigateByUrl('/customers');
      // this._authService.login({
      //   username,
      //   password,
      // }).subscribe(resp => {
      //   this._localStorageService.setItem(KEY_STORAGE.DATA_USER, resp);
      //   this._router.navigateByUrl('/customers');
      // });
    }
  }
}
