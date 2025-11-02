import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { authInterceptor } from '../core/services/interceptors/auth.interceptor';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function initTranslateFactory(translate: TranslateService) {
  return () => {
    const lang = navigator.language.toLowerCase();
    const supported = ['pt', 'en', 'es'];
    const fallback = 'pt';
    const selected = supported.find(l => lang.includes(l)) || fallback;

    translate.setDefaultLang(fallback);
    return translate.use(selected).toPromise();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
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
      deps: [TranslateService],
      multi: true
    }
  ]
};