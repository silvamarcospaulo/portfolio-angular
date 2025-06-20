import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienciaProfissional } from '../../../../../../../../model/experienciaProfissional.model';

@Component({
  selector: 'app-card-experiencia-profissional',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-experiencia-profissional.component.html',
  styleUrls: ['./card-experiencia-profissional.component.scss']
})
export class CardExperienciaProfissionalComponent {
  @Input() experienciaProfissional!: ExperienciaProfissional;
}