import { Component, Input } from '@angular/core';
import { ExperienciaProfissional } from '../../../../../../../../model/experienciaProfissional.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-experiencia-profissional',
  imports: [TranslateModule],
  templateUrl: './card-experiencia-profissional.component.html',
  styleUrl: './card-experiencia-profissional.component.scss'
})
export class CardExperienciaProfissionalComponent {
  @Input() experienciaProfissional!: ExperienciaProfissional;
}