import { Component, Input } from '@angular/core';
import { Link } from '../../../../model/link.model';

@Component({
  selector: 'app-social-links',
  standalone: true,
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss'
})
export class SocialLinksComponent {
  @Input() links: Link[] = [];
  @Input() size: 'sm' | 'md' = 'md';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
}
