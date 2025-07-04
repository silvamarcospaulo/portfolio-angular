import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: {
    titulo: string;
    descricao: string;
    image: string;
    url: string;
    repositorio: string;
  };
}