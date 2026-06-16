import { inject, InjectionToken } from '@angular/core';

import { UBFB_WINDOW } from './window.token';

export const UBFB_LOCAL_STORAGE = new InjectionToken<Storage | null>(
  ngDevMode ? '[UBFB_LOCAL_STORAGE]' : '',
  { providedIn: 'root', factory: () => inject(UBFB_WINDOW).localStorage },
);
