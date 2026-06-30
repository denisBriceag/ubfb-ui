import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export const UBFB_ENV = new InjectionToken<typeof environment>(
  ngDevMode ? '[UBFB_ENVIRONMENT]' : '',
  {
    providedIn: 'root',
    factory: () => environment,
  },
);
