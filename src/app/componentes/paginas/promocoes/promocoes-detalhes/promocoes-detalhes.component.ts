import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../../reutilizaveis/header/header.component";
import { FooterComponent } from "../../../reutilizaveis/footer/footer.component";
import { Produto } from '../../../../../model/produto/produto';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../../../core/services/afiliados-repository/produto-repositoy/produto-repositoy.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-promocoes-detalhes',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './promocoes-detalhes.component.html',
  styleUrl: './promocoes-detalhes.component.scss'
})
export class PromocoesDetalhesComponent implements OnInit {
  produtoSelecionado!: Produto;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const loja = this.route.snapshot.paramMap.get('loja');
    const id = this.route.snapshot.paramMap.get('id');
    if (!loja) throw new Error("Loja não informada!");
    if (!id) throw new Error("Produto não informado!");

    await this.obterProdutoPorId(id);
  }

  async obterProdutoPorId(id: string) {
    try {
      id = "produtos_" + id;
      const produto = await firstValueFrom(await this.produtoService.obterPorId(id));

      if (!produto) throw new Error("Produto não encontrado");

      this.produtoSelecionado = produto;

    } catch (error: any) {
      alert(error.message);
      this.router.navigate(['/promocoes']);
    }
  }
}