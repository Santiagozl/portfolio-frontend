import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
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
    provideHttpClient(),
    // Rama full-stack: los componentes dependen de PortfolioDataService,
    // no de ApiDataService directamente, para poder cambiar de
    // implementación sin tocar el resto de la app.
    { provide: PortfolioDataService, useClass: ApiDataService },
  ]
};
