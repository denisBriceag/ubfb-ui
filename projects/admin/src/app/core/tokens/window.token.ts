import { DOCUMENT, inject, InjectionToken } from '@angular/core';

export const UBFB_WINDOW = new InjectionToken<Window>(ngDevMode ? '[UBFB_WINDOW]' : '', {
  factory: () => {
    const { defaultView } = inject(DOCUMENT);

    if (!defaultView) {
      throw new Error('Window is not available');
    }

    return defaultView;
  },
});
