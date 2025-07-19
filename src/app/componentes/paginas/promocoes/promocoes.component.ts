import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProdutoService } from '../../../../services/produto/ProdutoService';
import { Produto } from '../../../../model/produto/produto';
import { CardPromocaoComponent } from '../../reutilizaveis/card-promocao/card-promocao.component';
import { PRODUTOS_AMAZON } from './data/produto';
import { FooterComponent } from "../../reutilizaveis/footer/footer.component";
import { HeaderComponent } from "../../reutilizaveis/header/header.component";

@Component({
  selector: 'app-promocoes',
  standalone: true,
  imports: [CommonModule, FormsModule, CardPromocaoComponent, FooterComponent, HeaderComponent],
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.scss']
})
export class PromocoesComponent {
  novos: Produto[] = [];
  emAlta: Produto[] = [];

  constructor(private produtoService: ProdutoService) {
    const produtos = PRODUTOS_AMAZON;

    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 7);

    this.novos = produtos.filter(p => new Date(p.dataInclusao) >= dataLimite);
    this.emAlta = produtos
      .filter(p => (p.acessos ?? 0) > 10)
      .sort((a, b) => (b.acessos ?? 0) - (a.acessos ?? 0))
      .slice(0, 9);
  }
}