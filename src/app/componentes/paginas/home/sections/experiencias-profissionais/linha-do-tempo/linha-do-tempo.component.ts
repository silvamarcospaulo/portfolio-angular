import { Component, Input } from '@angular/core';
import { ExperienciaProfissional } from '../../../../../../../model/experienciaProfissional.model';
import { CardExperienciaProfissionalComponent } from './card-experiencia-profissional/card-experiencia-profissional.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-linha-do-tempo',
  standalone: true,
  imports: [CommonModule, CardExperienciaProfissionalComponent],
  templateUrl: './linha-do-tempo.component.html',
  styleUrls: ['./linha-do-tempo.component.scss']
})
export class LinhaDoTempoComponent {
  @Input() listaDeExperienciasProfissionais: ExperienciaProfissional[] = [];
  experienciaHover: ExperienciaProfissional | null = null;

  private parseMesAno(mesAno: string): Date {
    if (mesAno.toLowerCase().includes('atualmente')) return new Date();
    const [mes, ano] = mesAno.split('/');
    return new Date(parseInt(ano), parseInt(mes) - 1, 1);
  }

  getPosicaoRelativa(exp: ExperienciaProfissional): string {
    const datas = this.listaDeExperienciasProfissionais
      .flatMap(e => [
        this.parseMesAno(e.inicio).getTime(),
        this.parseMesAno(e.fim).getTime()
      ]);

    const min = Math.min(...datas);
    const max = Math.max(...datas);
    const total = max - min || 1;

    const inicio = this.parseMesAno(exp.inicio).getTime();
    const fim = this.parseMesAno(exp.fim).getTime();
    const centro = inicio + (fim - inicio) / 2;

    const perc = ((centro - min) / total) * 100;
    return `${perc}%`;
  }
}