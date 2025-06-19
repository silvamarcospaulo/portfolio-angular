import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-menu-redes-sociais',
  imports: [],
  templateUrl: './menu-redes-sociais.component.html',
  styleUrl: './menu-redes-sociais.component.scss'
})
export class MenuRedesSociaisComponent {
  deveRetrair = true;
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
  };

  AoClicarAbrirMenuRedesSociais() {
    this.deveRetrair = !this.deveRetrair;
  }
}
