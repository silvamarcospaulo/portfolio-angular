import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Link } from '../../../../model/link.model';
import { ScrollService } from '../../../../core/services/scroll/scroll.service';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss'
})
export class NavListComponent {
  @Input() links: Link[] = [];
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() onNavigate?: () => void;

  constructor(private scroll: ScrollService) {}

  go(url: string, event: Event): void {
    event.preventDefault();
    if (/^(https?:)?\/\/|^www\./i.test(url)) {
      const href = /^https?:\/\//i.test(url) ? url : `https://${url.replace(/^\/\//, '')}`;
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    const id = url.replace(/^#/, '');
    this.scroll.scrollTo(id);
    this.onNavigate?.();
  }
}
