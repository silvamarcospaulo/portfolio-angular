import { Component, Input } from '@angular/core';
import { ExperienciaProfissional } from '../../../../../../../model/experienciaProfissional.model';

@Component({
  selector: 'app-linha-do-tempo',
  standalone: true,
  imports: [],
  templateUrl: './linha-do-tempo.component.html',
  styleUrls: ['./linha-do-tempo.component.scss']
})
export class LinhaDoTempoComponent {
  @Input() listaDeExperienciasProfissionais!: ExperienciaProfissional[];
}