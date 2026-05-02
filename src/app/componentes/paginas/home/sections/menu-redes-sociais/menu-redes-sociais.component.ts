import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SocialLinksComponent } from '../../../../reutilizaveis/social-links/social-links.component';
import { ScrollService } from '../../../../../../core/services/scroll/scroll.service';
import { PersonalDataService } from '../../../../../../core/services/personal-data/personal-data.service';
import { Link } from '../../../../../../model/link.model';

@Component({
  selector: 'app-menu-redes-sociais',
  templateUrl: './menu-redes-sociais.component.html',
  styleUrls: ['./menu-redes-sociais.component.scss'],
  standalone: true,
  imports: [SocialLinksComponent]
})
export class MenuRedesSociaisComponent {
  deveRetrair = true;
  mostrarBotaoVoltar = false;
  isBrowser: boolean;
  socialLinks: Link[];

  private unsubScroll?: () => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private scroll: ScrollService,
    personalData: PersonalDataService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.socialLinks = personalData.getSocialLinks();
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.unsubScroll = this.scroll.onScroll(y => {
        this.deveRetrair = y > 100;
        this.mostrarBotaoVoltar = y > 100;
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubScroll?.();
  }

  toggleMenu(): void { this.deveRetrair = !this.deveRetrair; }

  scrollParaTopo(): void { this.scroll.scrollToTop(); }
}
