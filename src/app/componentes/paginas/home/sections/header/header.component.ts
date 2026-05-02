import { Component, Inject, Input, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownIdiomasComponent } from '../../../../reutilizaveis/dropdown-idiomas/dropdown-idiomas.component';
import { SwitchDiaNoiteComponent } from '../../../../reutilizaveis/switch-dia-noite/switch-dia-noite.component';
import { NavListComponent } from '../../../../reutilizaveis/nav-list/nav-list.component';
import { IconButtonDirective } from '../../../../reutilizaveis/icon-button/icon-button.directive';
import { ScrollService } from '../../../../../../core/services/scroll/scroll.service';
import { Link } from '../../../../../../model/link.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, NgClass, DropdownIdiomasComponent, SwitchDiaNoiteComponent, NavListComponent, IconButtonDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() links: Link[] = [];

  open = signal(false);
  headerTranslucido = false;
  isBrowser: boolean;

  private unsubScroll?: () => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private scroll: ScrollService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.unsubScroll = this.scroll.onScroll(y => { this.headerTranslucido = y > 20; });
    }
  }

  ngOnDestroy(): void {
    this.unsubScroll?.();
  }

  toggle(): void { this.open.update(v => !v); }
  fecharMenu(): void { this.open.set(false); }
}
