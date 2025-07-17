import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { FooterComponent } from '../../reutilizaveis/footer/footer.component';
import { CardPromocaoComponent } from '../../reutilizaveis/card-promocao/card-promocao.component';
import { CardProdutoAmazonComponent } from '../../reutilizaveis/card-produto-amazon/card-produto-amazon.component';
import { PROMOCOES } from '../../../data/promocoes';
import { Promocao } from '../../../../model/promocao.model';
import { ProdutoAfiliadoAmazon } from '../../../../model/produto-afiliado-amazon.model';
import { PromocaoAmazonService } from '../../../../services/amazon/promocao-amazon.service';

@Component({
  selector: 'app-promocoes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, CardPromocaoComponent, CardProdutoAmazonComponent],
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.scss']
})
export class PromocoesComponent implements OnInit {
  tabs = ['home', 'mercado-livre', 'kabum', 'amazon', 'aliexpress', 'shopee'];
  activeTab = 'home';

  linkOriginal = '';
  linkAfiliado = '';

  newest: Promocao[] = PROMOCOES.slice(0, 3);
  trending: Promocao[] = PROMOCOES.slice(3, 6);

  produtosAmazon: ProdutoAfiliadoAmazon[] = [];
  carregandoAmazon = false;

  constructor(private servicoAmazon: PromocaoAmazonService) { }

  ngOnInit(): void {
    this.carregarAmazon();
  }

  filtrar(store: string): Promocao[] {
    return PROMOCOES.filter(p => p.store === store);
  }

  gerarLink() {
    this.linkAfiliado = this.linkOriginal
      ? `https://meuslinks.com?url=${encodeURIComponent(this.linkOriginal)}`
      : '';
  }

  private carregarAmazon() {
    this.carregandoAmazon = true;
    this.servicoAmazon.listarPromocoes().subscribe({
      next: produtos => {
        this.produtosAmazon = produtos;
        this.carregandoAmazon = false;
      },
      error: () => {
        this.carregandoAmazon = false;
      }
    });
  }
}
