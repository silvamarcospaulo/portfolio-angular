// meus-links.component.ts
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../services/seo/seo.service';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-meus-links',
  standalone: true,
  imports: [TranslateModule, CardComponent],
  templateUrl: './meus-links.component.html',
  styleUrl: './meus-links.component.scss'
})
export class MeusLinksComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.atualizarMetadados({
      title: 'Links Úteis - Marcos Paulo Silva',
      description: 'Acesse meus principais links: Instagram, LinkedIn, GitHub e mais.',
      image: 'https://www.marcospaulosilva.com.br/assets/images/logo.png',
      url: 'https://www.marcospaulosilva.com.br/links-uteis'
    });
  }
}