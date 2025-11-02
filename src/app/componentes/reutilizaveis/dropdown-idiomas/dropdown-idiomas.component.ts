import { Component, signal, Signal, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IdiomaService, Linguagem } from '../../../../core/services/idioma/idioma.service';

@Component({
  selector: 'app-dropdown-idiomas',
  standalone: true,
  templateUrl: './dropdown-idiomas.component.html',
  styleUrls: ['./dropdown-idiomas.component.scss'],
})
export class DropdownIdiomasComponent {
  @Input() direction: 'up' | 'down' = 'down';

  linguagens: Linguagem[] = [];
  linguagemSelecionada!: Signal<Linguagem>;
  isOpen = false;

  constructor(private idiomaService: IdiomaService) {
    this.linguagens = this.idiomaService.getLinguagens();
    this.linguagemSelecionada = toSignal(
      this.idiomaService.linguagemSelecionada$,
      { initialValue: this.idiomaService.linguagemSelecionadaSubject.value }
    );
  }

  aoClicarEmIdiomas() {
    this.isOpen = !this.isOpen;
  }

  selecionarLinguagem(lang: Linguagem) {
    this.idiomaService.selecionarLinguagem(lang);
    this.isOpen = false;
  }
}