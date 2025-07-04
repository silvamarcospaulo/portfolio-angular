import { Component, Input } from '@angular/core';
import { ExperienciaProfissional } from '../../../../../../../../model/experienciaProfissional.model';
import { CommonModule } from '@angular/common';
import { CardExperienciaProfissionalComponent } from '../card-experiencia-profissional/card-experiencia-profissional.component';

@Component({
  selector: 'app-botao-linha-do-tempo',
  standalone: true,
  imports: [CommonModule, CardExperienciaProfissionalComponent],
  templateUrl: './botao-linha-do-tempo.component.html',
  styleUrls: ['./botao-linha-do-tempo.component.scss']
})
export class BotaoLinhaDoTempoComponent {
  @Input() experienciaProfissional!: ExperienciaProfissional;
  mostrarModal = false;

  private static modalAbertaGlobal = false;

  abrirModal(): void {
    if (!BotaoLinhaDoTempoComponent.modalAbertaGlobal) {
      this.mostrarModal = true;
      BotaoLinhaDoTempoComponent.modalAbertaGlobal = true;
    }
  }

  fecharModal(): void {
    this.mostrarModal = false;
    BotaoLinhaDoTempoComponent.modalAbertaGlobal = false;
  }
}