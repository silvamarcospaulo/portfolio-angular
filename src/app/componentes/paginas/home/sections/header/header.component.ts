import { Component, Inject, Input, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownIdiomasComponent } from '../../../../reutilizaveis/dropdown-idiomas/dropdown-idiomas.component';
import { SwitchDiaNoiteComponent } from '../../../../reutilizaveis/switch-dia-noite/switch-dia-noite.component';
import { ScrollService } from '../../../../../../core/services/scroll/scroll.service';
import { Link } from '../../../../../../model/link.model';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private scroll: ScrollService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  go(url: string, event: Event) {
    event.preventDefault();
    const id = url.replace(/^#/, '');
    this.scroll.scrollTo(id);
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