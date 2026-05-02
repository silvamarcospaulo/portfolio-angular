import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../core/services/seo/seo.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from "../home/sections/footer/footer.component";
import { Link } from '../../../../model/link.model';
import { PersonalDataService } from '../../../../core/services/personal-data/personal-data.service';

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
  imports: [TranslateModule, FooterComponent],
  templateUrl: './meus-links.component.html',
  styleUrls: ['./meus-links.component.scss']
})
export class MeusLinksComponent implements OnInit {
  hero: {
    welcome: string;
    instagramHandle: string;
    instagramUrl: string;
    name: string;
    role: string;
    summary: string;
    primaryAction: { label: string; url: string };
    secondaryAction: { label: string; url: string };
    photo: string;
  };

  links: Link[];
  primaryLinks: BioLink[];

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
      title: 'bio.primary-links.services.title',
      description: 'bio.primary-links.services.description',
      url: 'https://www.marcospaulosilva.com/bio',
      icon: 'bi bi-briefcase',
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

  constructor(
    private seoService: SeoService,
    private translate: TranslateService,
    private personalData: PersonalDataService
  ) {
    this.hero = {
      welcome: 'bio.hero.welcome',
      instagramHandle: personalData.instagramHandle,
      instagramUrl: personalData.instagram,
      name: 'bio.hero.name',
      role: 'bio.hero.role',
      summary: 'bio.hero.summary',
      primaryAction: { label: 'bio.hero.actions.primary', url: personalData.emailHref },
      secondaryAction: { label: 'bio.hero.actions.secondary', url: personalData.portfolioUrl },
      photo: 'assets/images/euInicio-bw.png'
    };

    this.links = [
      new Link({ nome: 'common.portfolio', url: personalData.portfolioUrl })
    ];

    this.primaryLinks = [
      {
        title: 'bio.primary-links.instagram.title',
        description: 'bio.primary-links.instagram.description',
        url: personalData.instagram,
        icon: 'bi bi-instagram',
        external: true
      },
      {
        title: 'bio.primary-links.linkedin.title',
        description: 'bio.primary-links.linkedin.description',
        url: personalData.linkedin,
        icon: 'bi bi-linkedin',
        external: true
      },
      {
        title: 'bio.primary-links.github.title',
        description: 'bio.primary-links.github.description',
        url: personalData.github,
        icon: 'bi bi-github',
        external: true
      },
      {
        title: 'bio.primary-links.contact.title',
        description: 'bio.primary-links.contact.description',
        url: personalData.emailHref,
        icon: 'bi bi-envelope-fill'
      }
    ];
  }

  ngOnInit(): void {
    this.seoService.atualizarMetadados({
      title: this.translate.instant('bio.seo.title'),
      description: this.translate.instant('bio.seo.description'),
      image: `${this.personalData.portfolioUrl}/assets/images/metadata.png`,
      url: `${this.personalData.portfolioUrl}/bio`
    });
  }
}
