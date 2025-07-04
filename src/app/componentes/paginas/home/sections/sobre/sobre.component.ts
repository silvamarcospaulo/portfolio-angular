import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LinhaDoTempoComponent } from './linha-do-tempo/linha-do-tempo.component';
import { ExperienciaProfissional } from '../../../../../../model/experienciaProfissional.model';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [TranslateModule, LinhaDoTempoComponent],
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent {
 @Input() listaDeExperienciasProfissionais: ExperienciaProfissional[] = [];
}