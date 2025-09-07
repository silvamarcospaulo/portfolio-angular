import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Projeto } from '../../../../../../model/projeto/projeto.model';
import { CarrosselComponent } from './carrossel/carrossel.component';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [TranslateModule, CarrosselComponent],
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})

export class ProjetosComponent {
  @Input() listaDeProjetos!: Projeto[];
}