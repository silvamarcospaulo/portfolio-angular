import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../core/services/seo/seo.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type BioLink = {
  title: string;
  description: string;
  url: string;
  icon?: string;
  image?: string;
  external?: boolean;
};

@Component({
  selector: 'app-meus-links',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './meus-links.component.html',
  styleUrls: ['./meus-links.component.scss']
})
export class MeusLinksComponent implements OnInit {
  hero = {
    welcome: 'bio.hero.welcome',
    instagramHandle: '@marcospaulo.dev',
    instagramUrl: 'https://instagram.com/marcospaulo.dev',
    name: 'bio.hero.name',
    role: 'bio.hero.role',
    summary: 'bio.hero.summary',
    primaryAction: {
      label: 'bio.hero.actions.primary',
      url: 'mailto:silvampsmarcospaulo@gmail.com'
    },
    secondaryAction: {
      label: 'bio.hero.actions.secondary',
      url: 'https://www.marcospaulosilva.com.br'
    },
    photo: 'assets/images/euInicio-bw.png'
  };

  primaryLinks: BioLink[] = [
    {
      title: 'bio.primary-links.instagram.title',
      description: 'bio.primary-links.instagram.description',
      url: 'https://instagram.com/marcospaulo.dev',
      icon: 'bi bi-instagram',
      external: true
    },
    {
      title: 'bio.primary-links.linkedin.title',
      description: 'bio.primary-links.linkedin.description',
      url: 'https://linkedin.com/in/silvamarcospaulo',
      icon: 'bi bi-linkedin',
      external: true
    },
    {
      title: 'bio.primary-links.github.title',
      description: 'bio.primary-links.github.description',
      url: 'https://github.com/silvamarcospaulo',
      icon: 'bi bi-github',
      external: true
    },
    {
      title: 'bio.primary-links.contact.title',
      description: 'bio.primary-links.contact.description',
      url: 'mailto:silvampsmarcospaulo@gmail.com',
      icon: 'bi bi-envelope-fill'
    }
  ];

  communityResources: BioLink[] = [
    {
      title: 'bio.community.learn-to-code.title',
      description: 'bio.community.learn-to-code.description',
      url: 'https://www.marcospaulosilva.com/bio',
      icon: 'bi bi-mortarboard-fill',
      external: true
    },
    {
      title: 'bio.community.newsletter.title',
      description: 'bio.community.newsletter.description',
      url: 'https://www.marcospaulosilva.com/bio',
      icon: 'bi bi-mortarboard-fill',
      external: true
    },
    {
      title: 'bio.community.setup.title',
      description: 'bio.community.setup.description',
      url: 'https://www.marcospaulosilva.com/bio',
      icon: 'bi bi-lightning-charge-fill',
      external: true
    },
    {
      title: 'bio.community.wellness.title',
      description: 'bio.community.wellness.description',
      url: 'https://www.marcospaulosilva.com/bio',
      icon: 'bi bi-capsule',
      external: true
    }
  ];

  spotlightCards: BioLink[] = [
    {
      title: 'bio.spotlight.projects.title',
      description: 'bio.spotlight.projects.description',
      url: 'https://www.marcospaulosilva.com.br',
      image: 'assets/images/macbook.png',
      external: true
    },
    {
      title: 'bio.spotlight.vorix.title',
      description: 'bio.spotlight.vorix.description',
      url: 'https://www.marcospaulosilva.com.br',
      image: 'assets/images/print-projetos/lsgblackfriday.png',
      external: true
    }
  ];

  constructor(private seoService: SeoService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.atualizarMetadados();
  }

  private atualizarMetadados(): void {
    this.seoService.atualizarMetadados({
      title: this.translate.instant('bio.seo.title'),
      description: this.translate.instant('bio.seo.description'),
      image: 'https://www.marcospaulosilva.com.br/assets/images/metadado.png',
      url: 'https://www.marcospaulosilva.com.br/bio'
    });
  }
}

