import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SwitchDiaNoiteComponent } from "../switch-dia-noite/switch-dia-noite.component";
import { DropdownIdiomasComponent } from "../dropdown-idiomas/dropdown-idiomas.component";
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SwitchDiaNoiteComponent, DropdownIdiomasComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  menuAberto = false;

  fecharMenu() {
    this.menuAberto = false;
  }

  headerTranslucido = false;
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
    this.headerTranslucido = window.scrollY > 20;
  };
}