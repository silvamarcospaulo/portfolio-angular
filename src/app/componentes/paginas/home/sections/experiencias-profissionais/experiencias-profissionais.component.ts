import { Component } from '@angular/core';
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
  listaDeExperienciasProfissionais: ExperienciaProfissional[] = [
    new ExperienciaProfissional(
      'Desenvolvedor Frontend',
      'Empresa A',
      'Jan 2020 - Dez 2021',
      'Desenvolvimento de aplicações web utilizando Angular e TypeScript.'
    ),
    new ExperienciaProfissional(
      'Desenvolvedor Full Stack',
      'Empresa B',
      'Jan 2022 - Presente',
      'Desenvolvimento de aplicações web utilizando Angular, Node.js e MongoDB.'
    )
  ]
}