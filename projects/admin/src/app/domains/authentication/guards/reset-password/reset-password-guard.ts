import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const resetPasswordGuard: CanActivateFn = (route) => {
  if (route.queryParamMap.get('token')) return true;

  return inject(Router).createUrlTree(['/auth/sign-in']);
};
