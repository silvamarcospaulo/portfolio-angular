import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { FooterComponent } from '../../reutilizaveis/footer/footer.component';
import { CardProdutoAmazonComponent } from '../../reutilizaveis/card-produto-amazon/card-produto-amazon.component';
import { ProdutoAfiliadoAmazon } from '../../../../model/produto-afiliado-amazon.model';
import { AmazonService } from '../../../services/amazon/amazon.service';

@Component({
  selector: 'app-promocoes-amazon',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CardProdutoAmazonComponent],
  templateUrl: './promocoes-amazon.component.html',
  styleUrls: ['./promocoes-amazon.component.scss']
})
export class PromocoesAmazonComponent implements OnInit {
  produtos: ProdutoAfiliadoAmazon[] = [];
  private palavrasChave = ['cadeira gamer', 'monitor', 'notebook'];

  constructor(private amazonService: AmazonService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  private carregarProdutos() {
    for (const palavra of this.palavrasChave) {
      this.amazonService.buscarProdutos(palavra).subscribe(p => {
        this.produtos.push(...p);
      });
    }
  }
}
