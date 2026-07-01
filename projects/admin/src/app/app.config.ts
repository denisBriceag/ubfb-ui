import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';

import { primengConfig } from '../../../../assets/theme/primeng.config';
import { routes } from './app.routes';
import { credentialsInterceptor } from './core/interceptors/credentials/credentials-interceptor';
import { proveAuthStatusInitializer } from './core/providers/auth-status.provider';
import { globalLoadingInterceptor } from './core/interceptors/gloabal-loading/global-loading-interceptor';
import { accessTokenInterceptor } from './core/interceptors/access-token/access-token-interceptor';
import { sessionRefreshInterceptor } from './core/interceptors/session-refresh/session-refresh-interceptor';
import { UbfbAdminTitleStrategy } from './core/services/title-strategy/ubfb-admin-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        credentialsInterceptor,
        globalLoadingInterceptor,
        accessTokenInterceptor,
        sessionRefreshInterceptor,
      ]),
    ),
    proveAuthStatusInitializer(),
    provideRouter(routes),
    providePrimeNG(primengConfig),
    { provide: TitleStrategy, useClass: UbfbAdminTitleStrategy },
    MessageService,
  ],
};
