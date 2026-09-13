import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth.interceptor';
import { PortfolioTitleStrategy } from './core/title/portfolio-title.strategy';
import { PortfolioDataService } from './core/services/portfolio-data.service';
import { ApiDataService } from './core/services/api-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    { provide: TitleStrategy, useClass: PortfolioTitleStrategy },
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: PortfolioDataService, useClass: ApiDataService },
  ],
};
