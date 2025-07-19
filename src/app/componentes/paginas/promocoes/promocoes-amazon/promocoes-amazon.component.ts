import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPromocaoComponent } from '../../../reutilizaveis/card-promocao/card-promocao.component';

@Component({
  selector: 'app-promocoes-amazon',
  standalone: true,
  imports: [CommonModule, CardPromocaoComponent],
  templateUrl: './promocoes-amazon.component.html',
  styleUrls: ['./promocoes-amazon.component.scss']
})
export class PromocoesAmazonComponent {
  // produtos: Produto[] = LINKS_PRODUTOS.filter(p => p.loja === 'amazon');
}