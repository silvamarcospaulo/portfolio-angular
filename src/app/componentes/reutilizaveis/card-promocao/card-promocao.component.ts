import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Promocao } from '../../../../model/promocao.model';

@Component({
  selector: 'app-card-promocao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-promocao.component.html',
  styleUrls: ['./card-promocao.component.scss']
})
export class CardPromocaoComponent {
  @Input() promocao!: Promocao;
}
