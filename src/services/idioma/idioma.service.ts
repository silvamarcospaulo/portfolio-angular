import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export interface Linguagem {
  id: string;
  nome_linguagem: string;
  icone: string;
  linguagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
  private linguagens: Linguagem[] = [
    { id: 'pt', nome_linguagem: 'Português (Brasil)', icone: '🇧🇷', linguagem: 'Linguagem' },
    { id: 'en', nome_linguagem: 'English (USA)', icone: '🇺🇸', linguagem: 'Language' },
    { id: 'es', nome_linguagem: 'Español (España)', icone: '🇪🇸', linguagem: 'Idioma' }
  ];

  public linguagemSelecionadaSubject = new BehaviorSubject<Linguagem>(this.detectarIdiomaNavegador());
  linguagemSelecionada$ = this.linguagemSelecionadaSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.use(this.linguagemSelecionadaSubject.value.id);
  }

  getLinguagens() {
    return this.linguagens;
  }

  selecionarLinguagem(lang: Linguagem) {
    this.linguagemSelecionadaSubject.next(lang);
    this.translate.use(lang.id);
  }

  private detectarIdiomaNavegador(): Linguagem {
    const lang = navigator.language.toLowerCase();
    return this.linguagens.find(l => lang.includes(l.id.split('_')[0])) || this.linguagens[1];
  }
}