import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export function provideI18nSupport(): Provider[] {
    return [
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {
                const translate = inject(TranslateService);

                const lang = navigator.language.toLowerCase();
                const supported = ['pt', 'en', 'es'];
                const defaultLang = supported.find(l => lang.includes(l)) || 'pt';

                translate.setDefaultLang('pt');
                return translate.use(defaultLang).toPromise();
            },
            multi: true
        }
    ];
} import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export function provideI18nSupport(): Provider {
    return {
        provide: APP_INITIALIZER,
        useFactory: () => () => {
            const translate = inject(TranslateService);

            const lang = navigator.language.toLowerCase();
            const supported = ['pt', 'en', 'es'];
            const fallbackLang = 'pt';
            const detectedLang = supported.find(l => lang.includes(l)) || fallbackLang;

            translate.setDefaultLang(fallbackLang);
            return translate.use(detectedLang).toPromise(); // Aguarda o carregamento do JSON
        },
        multi: true
    };
}