import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { TRACKING_SERVICE, TrackingLike } from '../tracking/tracking.token';

export interface Linguagem {
  id: string;
  nome_linguagem: string;
  icone: SafeHtml;
  linguagem: string;
}

@Injectable({
  providedIn: 'root',
})
export class IdiomaService {
  private readonly linguagens: Linguagem[];
  private readonly isBrowser: boolean;

  public linguagemSelecionadaSubject: BehaviorSubject<Linguagem>;
  public linguagemSelecionada$;

  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(TRACKING_SERVICE) private tracking?: TrackingLike
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.linguagens = [
      {
        id: 'pt',
        nome_linguagem: 'Português (Brasil)',
        icone: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
            <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#459a45"></rect>
            <path d="M3.472,16l12.528,8,12.528-8-12.528-8L3.472,16Z" fill="#fedf00"></path>
            <circle cx="16" cy="16" r="5" fill="#0a2172"></circle>
          </svg>`),
        linguagem: 'Linguagem',
      },
      {
        id: 'en',
        nome_linguagem: 'English (USA)',
        icone: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
            <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect>
            <path fill="#a62842" d="M1 5h30v2H1zM1 9h30v2H1zM1 13h30v2H1zM1 17h30v2H1zM1 21h30v2H1zM1 25h30v2H1z"/>
            <rect x="1" y="4" width="12" height="12" fill="#102d5e"></rect>
          </svg>`),
        linguagem: 'Language',
      },
      {
        id: 'es',
        nome_linguagem: 'Español (España)',
        icone: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
            <path fill="#a0251e" d="M1 4h30v6H1zM1 22h30v6H1z"></path>
            <path fill="#f1c142" d="M1 10h30v12H1z"></path>
          </svg>`),
        linguagem: 'Idioma',
      },
    ];

    const idiomaDetectado = this.detectarIdiomaNavegador();
    this.linguagemSelecionadaSubject = new BehaviorSubject<Linguagem>(idiomaDetectado);
    this.linguagemSelecionada$ = this.linguagemSelecionadaSubject.asObservable();

    this.translate.use(idiomaDetectado.id);
    this.atualizarIdiomaDoDocumento(idiomaDetectado.id);
  }

  public getLinguagens(): Linguagem[] {
    return this.linguagens;
  }

  public selecionarLinguagem(lang: Linguagem): void {
    this.linguagemSelecionadaSubject.next(lang);
    this.translate.use(lang.id);
    this.atualizarIdiomaDoDocumento(lang.id);
    this.tracking?.track('language_change', {
      language_selected: lang.id,
    });
  }

  private detectarIdiomaNavegador(): Linguagem {
    if (!this.isBrowser) {
      return this.linguagens[0];
    }

    const lang = navigator.language.toLowerCase();
    return this.linguagens.find((linguagem) => lang.includes(linguagem.id)) || this.linguagens[0];
  }

  public linguagemSelecionada(): Linguagem {
    return this.linguagemSelecionadaSubject.value;
  }

  private atualizarIdiomaDoDocumento(idioma: string): void {
    this.document.documentElement.lang = idioma;
  }
}
