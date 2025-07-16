import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoAfiliadoAmazon } from '../../../../model/produto-afiliado-amazon.model';

@Component({
  selector: 'app-card-produto-amazon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-produto-amazon.component.html',
  styleUrls: ['./card-produto-amazon.component.scss']
})
export class CardProdutoAmazonComponent {
  @Input() produto!: ProdutoAfiliadoAmazon;
}
