import { Component, Input } from '@angular/core';
import { LinhaDoTempoComponent } from './linha-do-tempo/linha-do-tempo.component';
import { ExperienciaProfissional } from '../../../../../../model/experienciaProfissional.model';

@Component({
  selector: 'app-experiencias-profissionais',
  standalone: true,
  imports: [LinhaDoTempoComponent],
  templateUrl: './experiencias-profissionais.component.html',
  styleUrls: ['./experiencias-profissionais.component.scss']
})
export class ExperienciasProfissionaisComponent {
  @Input() listaDeExperienciasProfissionais!: ExperienciaProfissional[];
}