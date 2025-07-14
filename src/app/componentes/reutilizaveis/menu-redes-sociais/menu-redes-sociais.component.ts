import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-menu-redes-sociais',
  templateUrl: './menu-redes-sociais.component.html',
  styleUrls: ['./menu-redes-sociais.component.scss'],
  standalone: true
})
export class MenuRedesSociaisComponent {
  deveRetrair = true;
  mostrarBotaoVoltar = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = (): void => {
    this.deveRetrair = window.scrollY > 100;
    this.mostrarBotaoVoltar = window.scrollY > 100;
  };

  AoClicarAbrirMenuRedesSociais(): void {
    this.deveRetrair = !this.deveRetrair;
  }

  scrollParaTopo(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}