import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { primengConfig } from '../../../../assets/theme/primeng.config';
import { provideHttpClient } from '@angular/common/http';
import createPlugin from 'tailwindcss/plugin';
import withOptions = createPlugin.withOptions;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    providePrimeNG(primengConfig),
  ],
};
