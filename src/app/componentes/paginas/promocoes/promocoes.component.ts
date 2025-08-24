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
import { RetornoProdutoDto } from '../../../../model/produto/retorno-produto.dto';

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
  retornoProduto!: RetornoProdutoDto
  marcas: string[] = [];
  novos: Produto[] = [];
  emAlta: Produto[] = [];
  links: Link[] = [
    new Link({ nome: 'header.navbar.inicio', url: '/promocoes#section-promocoes' }),
    new Link({ nome: 'Amazon', url: "/promocoes#section-promocoes" }),
    new Link({ nome: 'AliExpress', url: "/promocoes#section-promocoes" }),
    new Link({ nome: 'Kabum', url: "/promocoes#section-promocoes" }),
    new Link({ nome: 'Shopee', url: "/promocoes#section-promocoes" }),
    new Link({ nome: 'Hostinger', url: "/promocoes#section-promocoes" }),
    new Link({ nome: 'Mercado Livre', url: "/promocoes#section-promocoes" }),
  ];

  constructor(private produtoService: ProdutoService) { }

  async ngOnInit(): Promise<void> {
    this.filtros = new FiltroProduto({
      pagina: 1,
      limite: 12,
    });

    await this.obterListaDeProdutos();
    await this.obterListaDeMarcas();
    await this.filtrarListasFixas();
  }

  async obterListaDeProdutos() {
    return this.retornoProduto = await firstValueFrom(await this.produtoService.listar(this.filtros));
  }

  async obterListaDeMarcas() {
    return this.marcas = await firstValueFrom(await this.produtoService.obterTodasMarcas());
  }

  async onFiltrosAtualizados() {
    return this.obterListaDeProdutos();
  }

  private async filtrarListasFixas() {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 7);

    this.novos = this.retornoProduto.produtos.filter(p => new Date(p.dataInclusao) >= dataLimite);
    this.emAlta = this.retornoProduto.produtos.sort(p => p.totalAvaliacoes ?? 0);
  }
}