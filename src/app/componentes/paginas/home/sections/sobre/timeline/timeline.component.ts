import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ExperienciaProfissional } from '../../../../../../../model/experiencia-profissional/experiencia-profissional.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-timeline',
  imports: [NgClass, TranslateModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})

export class TimelineComponent {
  @Input() listaDeExperienciasProfissionais: ExperienciaProfissional[] = [];
}