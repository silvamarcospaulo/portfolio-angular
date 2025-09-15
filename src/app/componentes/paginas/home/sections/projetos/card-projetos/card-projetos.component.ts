import { Component, Input } from '@angular/core';
import { Projeto } from '../../../../../../../model/projeto/projeto.model';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { TemaIconePipe } from '../../../../../../../core/services/tema-dia-noite/tema-icone.pipe';
import { TemaDiaNoiteService } from '../../../../../../../core/services/tema-dia-noite/tema-dia-noite.service';

@Component({
  selector: 'app-card-projetos',
  standalone: true,
  imports: [TranslateModule, TemaIconePipe, AsyncPipe],
  templateUrl: './card-projetos.component.html',
  styleUrls: ['./card-projetos.component.scss']
})
export class CardProjetosComponent {
  @Input() projeto!: Projeto;
  constructor(public tema: TemaDiaNoiteService) { }
  abrirLink(url: string): void {
    window.open(url, '_blank');
  }
}
