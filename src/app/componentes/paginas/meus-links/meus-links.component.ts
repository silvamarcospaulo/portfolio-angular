import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../services/seo/seo.service';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from './card/card.component';
import { FooterComponent } from '../../reutilizaveis/footer/footer.component';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { Link } from '../../../../model/link.model';

@Component({
  selector: 'app-meus-links',
  standalone: true,
  imports: [TranslateModule, CardComponent, FooterComponent, HeaderComponent],
  templateUrl: './meus-links.component.html',
  styleUrl: './meus-links.component.scss'
})
export class MeusLinksComponent implements OnInit {
  links: Link[] = [];

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.links = [
      new Link('LinkedIn', 'https://www.linkedin.com/in/silvamarcospaulo', 'bi bi-linkedin'),
      new Link('GitHub', 'https://github.com/silvamarcospaulo', 'bi bi-github'),
      new Link('Lojas Parceiras', 'https://062uniformes.com', 'bi bi-bag-check-fill'),
      new Link('Portfólio', '/', 'bi bi-laptop'),
      new Link('Contato', 'mailto:silvampsmarcospaulo@gmail.com', 'bi bi-envelope-fill'),
      new Link('Instagram', 'https://instagram.com/marcospaulo.dev', 'bi bi-instagram'),
    ];

    this.seoService.atualizarMetadados({
      title: 'Links Úteis - Marcos Paulo Silva',
      description: 'Acesse meus principais links: Instagram, LinkedIn, GitHub e mais.',
      image: 'https://www.marcospaulosilva.com.br/assets/images/logo.png',
      url: 'https://www.marcospaulosilva.com.br/links-uteis'
    });
  }
}