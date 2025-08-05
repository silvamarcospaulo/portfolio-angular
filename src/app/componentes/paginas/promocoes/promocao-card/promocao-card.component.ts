import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Produto } from '../../../../../model/produto/produto';

@Component({
  selector: 'app-promocao-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promocao-card.component.html',
  styleUrls: ['./promocao-card.component.scss']
})
export class PromocaoCardComponent {
  @Input() promocao!: Produto;

  constructor(
    private router: Router
  ) { }

  isNovidade(): boolean {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 7);
    return new Date(this.promocao.dataInclusao) >= dataLimite;
  }

  isEmAlta(): boolean {
    return (this.promocao.acessos ?? 0) > 10;
  }

  navegarParaDetalhes(event: MouseEvent): void {
    debugger
    event.preventDefault();
    event.stopPropagation();

    const loja = this.promocao.loja;
    let id = this.promocao.id;
    id = id.replaceAll("produtos/", "");

    if (loja && id) {
      this.router.navigate(['/promocoes', loja.toLowerCase(), id]);
    }
  }
}