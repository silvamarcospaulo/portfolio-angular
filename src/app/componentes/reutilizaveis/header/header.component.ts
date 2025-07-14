import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SwitchDiaNoiteComponent } from "../switch-dia-noite/switch-dia-noite.component";
import { DropdownIdiomasComponent } from "../dropdown-idiomas/dropdown-idiomas.component";
import { Link } from '../../../../model/link.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, SwitchDiaNoiteComponent, DropdownIdiomasComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() links: Link[] = [];

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