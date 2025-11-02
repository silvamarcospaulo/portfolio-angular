import { Component, Input } from '@angular/core';
import { SwitchDiaNoiteComponent } from '../../../../reutilizaveis/switch-dia-noite/switch-dia-noite.component';
import { DropdownIdiomasComponent } from '../../../../reutilizaveis/dropdown-idiomas/dropdown-idiomas.component';
import { TranslateModule } from '@ngx-translate/core';
import { Link } from '../../../../../../model/link.model';
import { ScrollService } from '../../../../../../core/services/scroll/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SwitchDiaNoiteComponent, DropdownIdiomasComponent, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  @Input() links: Link[] = [];

  constructor(private scroll: ScrollService) { }

  go(url: string, event: Event) {
    if (/^(https?:)?\/\/|^www\./i.test(url)) {
      event.preventDefault();
      const href = /^https?:\/\//i.test(url) ? url : `https://${url.replace(/^\/\//, '')}`;

      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    event.preventDefault();
    const id = url.replace(/^#/, '');
    this.scroll.scrollTo(id);
  }
}