import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  AccessToken,
  ResetPasswordModel,
  ResetPasswordRequestModel,
  SignInModel,
  SignUpModel,
} from './auth.model';
import { UBFB_ENV } from '../../tokens/env.token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _env = inject(UBFB_ENV);
  private readonly _http = inject(HttpClient);

  refresh(): Observable<AccessToken> {
    return this._http.get<AccessToken>(`${this._env.serverBaseUrl}/auth/refresh-tokens`);
  }

  signIn(signInModel: SignInModel): Observable<AccessToken> {
    return this._http.post<AccessToken>(`${this._env.serverBaseUrl}/auth/sign-in`, signInModel);
  }

  signUp(signUpModel: SignUpModel): Observable<AccessToken> {
    return this._http.post<AccessToken>(`${this._env.serverBaseUrl}/auth/sign-up`, signUpModel);
  }

  signOut(): Observable<void> {
    return this._http.get<void>(`${this._env.serverBaseUrl}/auth/sign-out`);
  }

  requestPasswordReset(email: ResetPasswordRequestModel): Observable<void> {
    return this._http.post<void>(`${this._env.serverBaseUrl}/auth/password-reset-request`, email);
  }

  resetPassword(resetPasswordModel: ResetPasswordModel): Observable<void> {
    return this._http.post<void>(
      `${this._env.serverBaseUrl}/auth/password-reset-confirm`,
      resetPasswordModel,
    );
  }
}
