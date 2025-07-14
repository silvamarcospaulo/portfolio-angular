import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienciaProfissional } from '../../../../../../../../model/experienciaProfissional.model';
import { CardExperienciaProfissionalComponent } from '../card-experiencia-profissional/card-experiencia-profissional.component';

@Component({
  selector: 'app-botao-linha-do-tempo',
  standalone: true,
  imports: [CommonModule, CardExperienciaProfissionalComponent],
  templateUrl: './botao-linha-do-tempo.component.html',
  styleUrls: ['./botao-linha-do-tempo.component.scss'],
})
export class BotaoLinhaDoTempoComponent {
  @Input() experienciaProfissional!: ExperienciaProfissional;
  @Input() aberto = false;
  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }
}