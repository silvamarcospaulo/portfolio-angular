import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../../../model/produto/produto';
import { FooterComponent } from "../../reutilizaveis/footer/footer.component";
import { PromocoesHeaderComponent } from "./promocoes-header/promocoes-header.component";
import { Link } from '../../../../model/link.model';
import { PromocaoCardComponent } from './promocao-card/promocao-card.component';
import { ProdutoService } from '../../../../core/services/afiliados-repository/produto-repositoy/produto-repositoy.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-promocoes',
  standalone: true,
  imports: [CommonModule, FormsModule, PromocaoCardComponent, FooterComponent, PromocoesHeaderComponent],
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.scss']
})
export class PromocoesComponent implements OnInit {
  filtroNome = '';
  marcaFiltro = '';
  ratingMinFiltro: number | null = null;
  mostrarSidebar = false;
  marcas: string[] = [];
  todosProdutos!: Produto[];
  produtosFiltrados!: Produto[]
  novos: Produto[] = [];
  emAlta: Produto[] = [];
  links: Link[] = [
    new Link('header.navbar.inicio', '/promocoes#section-promocoes'),
    new Link('Amazon', "/promocoes#section-promocoes"),
    new Link('AliExpress', "/promocoes#section-promocoes"),
    new Link('Kabum', "/promocoes#section-promocoes"),
    new Link('Shopee', "/promocoes#section-promocoes"),
    new Link('Hostinger', "/promocoes#section-promocoes"),
    new Link('Mercado Livre', "/promocoes#section-promocoes"),
  ];

  async ngOnInit(): Promise<void> {
    this.obterListaDeProdutos();
    this.marcas = [...new Set(this.todosProdutos
      .map(p => p.marca)
      .filter((m): m is string => !!m))];

    this.produtosFiltrados = [...this.todosProdutos];
    await this.filtrarListasFixas();
  }

  constructor(private produtoService: ProdutoService) { }

  async obterListaDeProdutos() {
    return this.produtosFiltrados = await firstValueFrom(await this.produtoService.listar());
  }

  onFiltrosAtualizados(filtros: {
    filtroNome: string;
    marcaFiltro: string;
    ratingMinFiltro: number | null;
  }) {
    this.filtroNome = filtros.filtroNome;
    this.marcaFiltro = filtros.marcaFiltro;
    this.ratingMinFiltro = filtros.ratingMinFiltro;

    let produtos = [...this.todosProdutos];

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

    this.produtosFiltrados = produtos;
  }

  private filtrarListasFixas() {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 7);

    this.novos = this.todosProdutos.filter(p => new Date(p.dataInclusao) >= dataLimite);
    this.emAlta = this.todosProdutos
      .filter(p => (p.acessos ?? 0) > 10)
      .sort((a, b) => (b.acessos ?? 0) - (a.acessos ?? 0))
      .slice(0, 10);
  }
}