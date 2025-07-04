import { Component, Input } from '@angular/core';
import { ExperienciaProfissional } from '../../../../../../../../model/experienciaProfissional.model';

@Component({
  selector: 'app-card-experiencia-profissional',
  imports: [],
  templateUrl: './card-experiencia-profissional.component.html',
  styleUrl: './card-experiencia-profissional.component.scss'
})
export class CardExperienciaProfissionalComponent {
  @Input() experienciaProfissional!: ExperienciaProfissional;
}