import { Component, Input } from '@angular/core';
import { Link } from '../../../../../model/link.model';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-card-dropdown',
  imports: [CardComponent],
  templateUrl: './card-dropdown.component.html',
  styleUrl: './card-dropdown.component.scss'
})

export class CardDropdownComponent {
  @Input() dropdown!: Link[];
  @Input() nome!: string | undefined;
  @Input() icone!: string | undefined;
  @Input() imagem!: string | undefined;
  aberto: boolean = false;

  abrirDropdown(): void {
    this.aberto = !this.aberto;
  }
}