import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemaDiaNoiteService {
  propriedadeTema = 'tema';
  propriedadeDark = 'dark';
  propriedadeLight = 'light';

  private isBrowser: boolean;
  private objetoTema: BehaviorSubject<boolean>;

  darkMode$ = new BehaviorSubject<boolean>(false).asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const tema = this.obterTemaDoDispositivo();
    this.objetoTema = new BehaviorSubject<boolean>(tema);
    this.darkMode$ = this.objetoTema.asObservable();

    if (this.isBrowser) {
      this.aplicarTema(this.objetoTema.value);
    }
  }

  alterarTema() {
    const novoTema = !this.objetoTema.value;
    this.inserirTema(novoTema);
  }

  inserirTema(dark: boolean) {
    this.objetoTema.next(dark);
    if (this.isBrowser) {
      this.aplicarTema(dark);
      localStorage.setItem(this.propriedadeTema, dark ? this.propriedadeDark : this.propriedadeLight);
    }
  }

  private obterTemaDoDispositivo(): boolean {
    if (!this.isBrowser) return false;
    const saved = localStorage.getItem(this.propriedadeTema);
    if (saved) return saved === this.propriedadeDark;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private aplicarTema(dark: boolean) {
    if (!this.isBrowser) return;
    document.body.classList.toggle('dark-mode', dark);
    document.body.classList.toggle('light-mode', !dark);
  }
}