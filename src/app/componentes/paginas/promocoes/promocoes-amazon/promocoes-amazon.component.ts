import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPromocaoComponent } from '../../../reutilizaveis/card-promocao/card-promocao.component';
import { PROMOCOES } from '../../../../data/promocoes';
import { Promocao } from '../../../../../model/promocao.model';

@Component({
  selector: 'app-promocoes-amazon',
  standalone: true,
  imports: [CommonModule, CardPromocaoComponent],
  templateUrl: './promocoes-amazon.component.html',
  styleUrls: ['./promocoes-amazon.component.scss']
})
export class PromocoesAmazonComponent {
  produtos: Promocao[] = PROMOCOES.filter(p => p.store === 'amazon');
}