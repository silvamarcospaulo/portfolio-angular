import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoLinhaDoTempoComponent } from './botao-linha-do-tempo/botao-linha-do-tempo.component';
import { ExperienciaProfissional } from '../../../../../../../model/experienciaProfissional.model';

@Component({
  selector: 'app-linha-do-tempo',
  standalone: true,
  imports: [CommonModule, BotaoLinhaDoTempoComponent],
  templateUrl: './linha-do-tempo.component.html',
  styleUrls: ['./linha-do-tempo.component.scss'],
})
export class LinhaDoTempoComponent {
  @Input() listaDeExperienciasProfissionais: ExperienciaProfissional[] = [];
  aberto: string | null = null;

  trackByInicio(index: number, exp: ExperienciaProfissional) {
    return exp.inicio;
  }

  toggle(inicio: string) {
    this.aberto = this.aberto === inicio ? null : inicio;
  }
}