import { Component, Input } from '@angular/core';
import { MacbookComponent } from './macbook/macbook.component';
import { Projeto } from '../../../../model/projeto.model';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [MacbookComponent],
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss']
})
export class CarrosselComponent {
  @Input() listaDeProjetos!: Projeto[];

  projetoAtualIndex = 0;

  get projetoAtual(): Projeto {
    return this.listaDeProjetos[this.projetoAtualIndex]
  }

  proximo() {
    if (this.listaDeProjetos.length > 0) {
      this.projetoAtualIndex = (this.projetoAtualIndex + 1) % this.listaDeProjetos.length;
    }
  }

  anterior() {
    if (this.listaDeProjetos.length > 0) {
      this.projetoAtualIndex =
        (this.projetoAtualIndex - 1 + this.listaDeProjetos.length) % this.listaDeProjetos.length;
    }
  }
}