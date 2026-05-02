import { Component, Input } from '@angular/core';
import { SwitchDiaNoiteComponent } from '../../../../reutilizaveis/switch-dia-noite/switch-dia-noite.component';
import { DropdownIdiomasComponent } from '../../../../reutilizaveis/dropdown-idiomas/dropdown-idiomas.component';
import { NavListComponent } from '../../../../reutilizaveis/nav-list/nav-list.component';
import { SocialLinksComponent } from '../../../../reutilizaveis/social-links/social-links.component';
import { TranslateModule } from '@ngx-translate/core';
import { Link } from '../../../../../../model/link.model';
import { PersonalDataService } from '../../../../../../core/services/personal-data/personal-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SwitchDiaNoiteComponent, DropdownIdiomasComponent, TranslateModule, NavListComponent, SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() links: Link[] = [];

  socialLinks: Link[];

  constructor(personalData: PersonalDataService) {
    this.socialLinks = personalData.getSocialLinks();
  }
}
