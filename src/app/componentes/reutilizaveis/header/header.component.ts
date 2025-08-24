import { Component, Inject, Input, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Link } from '../../../../model/link.model';
import { NgClass } from '@angular/common';
import { DropdownIdiomasComponent } from "../dropdown-idiomas/dropdown-idiomas.component";
import { SwitchDiaNoiteComponent } from "../switch-dia-noite/switch-dia-noite.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, NgClass, DropdownIdiomasComponent, SwitchDiaNoiteComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() links: Link[] = [];
  open = signal(false);

  menuAberto = false;

  fecharMenu() {
    this.open.set(false);
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

  toggle() { this.open.update(v => !v); }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = (): void => {
    this.headerTranslucido = window.scrollY > 20;
  };
}