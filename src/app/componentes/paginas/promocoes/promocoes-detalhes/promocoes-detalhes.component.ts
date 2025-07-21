import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../../reutilizaveis/header/header.component";
import { FooterComponent } from "../../../reutilizaveis/footer/footer.component";
import { Produto } from '../../../../../model/produto/produto';
import { ProdutoService } from '../../../../../services/produto/ProdutoService';
import { CommonModule } from '@angular/common';

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
    private router: Router,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/promocoes']);
      return;
    }

    this.produtoService.buscarPorId(id).subscribe({
      next: produto => {
        if (!produto) {
          this.router.navigate(['/promocoes']);
          return;
        }
        this.produtoSelecionado = produto;
      },
      error: () => this.router.navigate(['/promocoes'])
    });
  }
}