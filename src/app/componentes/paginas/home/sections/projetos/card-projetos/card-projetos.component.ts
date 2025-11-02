import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Projeto } from '../../../../../../../model/projeto/projeto.model';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { TemaIconePipe } from '../../../../../../../core/services/tema-dia-noite/tema-icone.pipe';
import { TemaDiaNoiteService } from '../../../../../../../core/services/tema-dia-noite/tema-dia-noite.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card-projetos',
  standalone: true,
  imports: [TranslateModule, TemaIconePipe, AsyncPipe],
  templateUrl: './card-projetos.component.html',
  styleUrls: ['./card-projetos.component.scss']
})
export class CardProjetosComponent implements OnChanges {
  @Input() projeto!: Projeto;
  safeIframeUrl?: SafeResourceUrl;

  constructor(public tema: TemaDiaNoiteService, private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projeto']) {
      this.safeIframeUrl = this.criarUrlIframeSeguro();
    }
  }

  private criarUrlIframeSeguro(): SafeResourceUrl | undefined {
    if (!this.projeto?.url) {
      return undefined;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.projeto.url);
  }

  abrirLink(url: string): void {
    window.open(url, '_blank');
  }
}
