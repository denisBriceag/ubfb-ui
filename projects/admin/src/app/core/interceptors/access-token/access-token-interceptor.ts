import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStore } from '../../store/user.store';

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _store = inject(UserStore);
  const whiteList = [
    'sign-in',
    'sign-up',
    'sign-out',
    'refresh-tokens',
    'password-reset-request',
    'password-reset-confirm',
  ] as const;

  if (!whiteList.some((white) => req.url.includes(white))) {
    const secureReq = req.clone({
      headers: new HttpHeaders({ Authorization: `Bearer ${_store.accessToken()}` }),
    });

    return next(secureReq);
  }

  return next(req);
};
