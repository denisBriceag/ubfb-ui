import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStore } from '../../store/user.store';

export const authGuard: CanActivateFn = () => {
  const _store = inject(UserStore);
  const _router = inject(Router);

  if (!_store.accessToken()) {
    void _router.navigate(['auth']);

    return false;
  }

  return true;
};
