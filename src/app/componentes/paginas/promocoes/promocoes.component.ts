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
import { FiltroProduto } from '../../../../model/filtro-produto/filtro-produto';

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
  filtros!: FiltroProduto;
  produtos!: Produto[]
  marcas: string[] = [];
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

  constructor(private produtoService: ProdutoService) { }

  async ngOnInit(): Promise<void> {
    this.filtros = new FiltroProduto({
      pagina: 1,
      limite: 2,
    });

    await this.obterListaDeProdutos();
    // await this.obterListaDeMarcas();

    await this.filtrarListasFixas();
  }


  async obterListaDeProdutos() {
    return this.produtos = await firstValueFrom(await this.produtoService.listar(this.filtros));
  }

  obterListaDeMarcas() {
    // if (this.produtosFiltrados?.length == 0 || !this.produtosFiltrados)
    //   return;

    // return this.marcas = [...new Set(this.todosProdutos.map(p => p.marca).filter((m): m is string => !!m))];
  }

  async onFiltrosAtualizados() {
    return this.obterListaDeProdutos();
  }

  private filtrarListasFixas() {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 7);

    this.novos = this.produtos.filter(p => new Date(p.dataInclusao) >= dataLimite);
    this.emAlta = this.produtos.sort(p => p.totalAvaliacoes ?? 0);
  }
}