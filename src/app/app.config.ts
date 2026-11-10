import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_INITIALIZER, importProvidersFrom, PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function initTranslateFactory(translate: TranslateService, platformId: object) {
  return () => {
    const lang = isPlatformBrowser(platformId) ? navigator.language.toLowerCase() : 'pt';
    const supported = ['pt', 'en', 'es'];
    const fallback = 'pt';
    const selected = supported.find(l => lang.includes(l)) || fallback;

    translate.setDefaultLang(fallback);
    return firstValueFrom(translate.use(selected));
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'pt'
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslateFactory,
      deps: [TranslateService, PLATFORM_ID],
      multi: true
    }
  ]
};