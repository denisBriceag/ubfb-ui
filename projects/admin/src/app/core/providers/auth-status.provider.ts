import { DOCUMENT, inject, provideAppInitializer } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { UserStore } from '../store/user.store';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

const INITIALIZER_BYPASS_ROUTES = ['/auth/reset-password'];

export function proveAuthStatusInitializer() {
  return provideAppInitializer(() => {
    const _authService = inject(AuthService);
    const _router = inject(Router);
    const _userStore = inject(UserStore);
    const _document = inject(DOCUMENT);

    const pathname = _document.location.pathname;

    if (INITIALIZER_BYPASS_ROUTES.some((route) => pathname.startsWith(route))) {
      return EMPTY;
    }

    return _authService.refresh().pipe(
      tap(({ accessToken }) => {
        _userStore.updateUser(accessToken);

        if (pathname.startsWith('/auth')) {
          void _router.navigate(['/dashboard']);
        }
      }),
      catchError(() => _router.navigate(['/auth'])),
    );
  });
}
