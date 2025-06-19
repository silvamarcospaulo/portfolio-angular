import { Component, Input } from '@angular/core';
import { MacbookComponent } from './macbook/macbook.component';
import { Imagem } from '../../../../model/imagem.model';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [MacbookComponent],
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss']
})
export class CarrosselComponent {
  @Input() listaDeImagens!: Imagem[];

  imagemAtualIndex = 0;

  get imagemAtual(): Imagem {
    return this.listaDeImagens[this.imagemAtualIndex]
  }

  proximo() {
    if (this.listaDeImagens.length > 0) {
      this.imagemAtualIndex = (this.imagemAtualIndex + 1) % this.listaDeImagens.length;
    }
  }

  anterior() {
    if (this.listaDeImagens.length > 0) {
      this.imagemAtualIndex =
        (this.imagemAtualIndex - 1 + this.listaDeImagens.length) % this.listaDeImagens.length;
    }
  }
}