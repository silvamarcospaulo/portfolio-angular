import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Projeto } from '../../../../../../model/projeto/projeto.model';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent {
  @Input() listaDeProjetos: Projeto[] = [];
}
