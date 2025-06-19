import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CarrosselComponent } from "../../../../reutilizaveis/carrossel/carrossel.component";
import { Projeto } from '../../../../../../model/projeto.model';

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