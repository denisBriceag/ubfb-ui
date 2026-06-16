import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  EMPTY,
  finalize,
  from,
  Observable,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { ERROR_MAP } from '../../constants/error-map.const';
import { GenericHttpError } from '../../../typings/error.type';
import { UserStore } from '../../store/user.store';
import { NotificationService } from '../../services/notification/notification.service';

const AUTH_URLS = [
  '/auth/refresh-tokens',
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/sign-out',
  '/auth/password-reset-request',
  '/auth/password-reset-confirm',
];

let refresh$: Observable<{ accessToken: string }> | null = null;

export const sessionRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);
  const _authService = inject(AuthService);
  const _notifications = inject(NotificationService);
  const _store = inject(UserStore);

  if (AUTH_URLS.some((url) => req.url.includes(url))) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorCode = (error.error as GenericHttpError).errorCode;

      if (
        error.status === HttpStatusCode.Unauthorized &&
        errorCode === ERROR_MAP.ACCESS_TOKEN_EXPIRED
      ) {
        if (refresh$ === null) {
          refresh$ = _authService.refresh().pipe(
            shareReplay(1),
            finalize(() => (refresh$ = null)),
          );
        }

        return refresh$.pipe(
          tap(({ accessToken }) => _store.updateUser(accessToken)),
          switchMap(() =>
            next(
              req.clone({
                headers: req.headers.set('Authorization', `Bearer ${_store.accessToken()}`),
              }),
            ),
          ),
          catchError((refreshError: HttpErrorResponse) => {
            _store.removeUser();

            if (
              (refreshError?.error as GenericHttpError)?.errorCode === ERROR_MAP.REFRESH_TOKEN_REUSE
            ) {
              _notifications.showToaster({
                type: 'warning',
                title: 'Security alert',
                message:
                  'Your session was terminated because your account was accessed from another location. Please sign in again and consider changing your password.',
              });
            }

            return from(_router.navigate(['/auth'])).pipe(switchMap(() => EMPTY));
          }),
        );
      }

      if (error.status === HttpStatusCode.Unauthorized) {
        _store.removeUser();

        return from(_router.navigate(['/auth'])).pipe(switchMap(() => throwError(() => error)));
      }

      return throwError(() => error);
    }),
  );
};
