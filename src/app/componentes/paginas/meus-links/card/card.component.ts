import { Component, Input } from '@angular/core';
import { Link } from '../../../../../model/link.model';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() link!: Link;
}