import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../../reutilizaveis/header/header.component";
import { FooterComponent } from "../../../reutilizaveis/footer/footer.component";
import { PRODUTOS_AMAZON } from '../data/produto';
import { Produto } from '../../../../../model/produto/produto';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    const loja = this.route.snapshot.paramMap.get('loja');
    const id = this.route.snapshot.paramMap.get('id');

    try {
      if (!id) throw new Error("Id não informado");

      const encontrado = PRODUTOS_AMAZON.find(
        p => p.id.toString() === id
      );

      if (!encontrado) throw new Error("Produto não encontrado");

      this.produtoSelecionado = encontrado;
    } catch (error: any) {
      alert(error.message);
      this.router.navigate(['/promocoes']);
    }
  }
}