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
  todosProdutos: Produto[] = PRODUTOS_AMAZON;
  novos: Produto[] = [];
  emAlta: Produto[] = [];

  filtroNome = '';
  marcaFiltro = '';
  ratingMinFiltro: number | null = null;
  mostrarSidebar = false;
  marcas: string[] = [];

  constructor(private produtoService: ProdutoService) {
    this.marcas = [...new Set(this.todosProdutos
      .map(p => p.marca)
      .filter((m): m is string => !!m))];

    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let produtos = this.todosProdutos;

    if (this.filtroNome) {
      produtos = produtos.filter(p =>
        p.titulo.toLowerCase().includes(this.filtroNome.toLowerCase())
      );
    }

    if (this.marcaFiltro) {
      produtos = produtos.filter(p =>
        (p.marca ?? '').toLowerCase().includes(this.marcaFiltro.toLowerCase())
      );
    }

    if (this.ratingMinFiltro !== null) {
      produtos = produtos.filter(p =>
        (p.rating ?? 0) >= (this.ratingMinFiltro ?? 0)
      );
    }

    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 7);

    this.novos = produtos.filter(p => new Date(p.dataInclusao) >= dataLimite);
    this.emAlta = produtos
      .filter(p => (p.acessos ?? 0) > 10)
      .sort((a, b) => (b.acessos ?? 0) - (a.acessos ?? 0))
      .slice(0, 9);
  }
}