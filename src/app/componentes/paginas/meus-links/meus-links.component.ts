import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../core/services/seo/seo.service';

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
  imports: [],
  templateUrl: './meus-links.component.html',
  styleUrls: ['./meus-links.component.scss']
})
export class MeusLinksComponent implements OnInit {
  hero = {
    welcome: 'Bem-vindo',
    instagramHandle: '@marcospaulo.dev',
    instagramUrl: 'https://instagram.com/marcospaulo.dev',
    name: 'Marcos Paulo Silva',
    role: 'Desenvolvedor de Software',
    summary: 'Desenvolvedor de Software, com atuação em aplicações web e soluções cloud. Experiência com .NET (C#), Java Spring e Angular. Nas horas vagas produzo conteúdo sobre tecnologia, programação e carreira com inspiração e dicas para você evoluir!\nEnjoy the journey!',
    primaryAction: {
      label: 'Fale comigo',
      url: 'mailto:silvampsmarcospaulo@gmail.com'
    },
    secondaryAction: {
      label: 'Ver portfólio',
      url: 'https://www.marcospaulosilva.com.br'
    },
    photo: 'assets/images/euInicio-bw.png'
  };

  primaryLinks: BioLink[] = [
    {
      title: 'Instagram',
      description: 'Conteúdo diário sobre carreira em tecnologia, bastidores de projetos e dicas de desenvolvimento.',
      url: 'https://instagram.com/marcospaulo.dev',
      icon: 'bi bi-instagram',
      external: true
    },
    {
      title: 'LinkedIn',
      description: 'Vamos nos conectar e acompanhar novidades da Invent Software e do ecossistema de inovação.',
      url: 'https://linkedin.com/in/silvamarcospaulo',
      icon: 'bi bi-linkedin',
      external: true
    },
    {
      title: 'GitHub',
      description: 'Repositórios com projetos em Angular, .NET, Java Spring e experimentos de arquitetura.',
      url: 'https://github.com/silvamarcospaulo',
      icon: 'bi bi-github',
      external: true
    },
    {
      title: 'Contato direto',
      description: 'Envie um e-mail e vamos conversar sobre projetos, consultorias ou parcerias.',
      url: 'mailto:silvampsmarcospaulo@gmail.com',
      icon: 'bi bi-envelope-fill'
    }
  ];

  communityResources: BioLink[] = [
    {
      title: 'Aprenda programação de graça!',
      description: 'Uma curadoria de conteúdos para você iniciar na programação com estrutura e sem custo.',
      url: 'https://www.marcospaulosilva.com/bio',
      icon: 'bi bi-mortarboard-fill',
      external: true
    },
    {
      title: 'Aprenda programação de graça!',
      description: 'Uma curadoria de conteúdos para você iniciar na programação com estrutura e sem custo.',
      url: 'https://www.marcospaulosilva.com/bio',
      icon: 'bi bi-mortarboard-fill',
      external: true
    },
    {
      title: 'Compre os itens do meu setup',
      description: 'Conheça os equipamentos que uso no dia a dia para criar, programar e produzir conteúdo.',
      url: 'https://www.marcospaulosilva.com/bio',
      icon: 'bi bi-lightning-charge-fill',
      external: true
    },
    {
      title: 'Whey e links',
      description: 'Minha seleção de suplementos favoritos para acompanhar a rotina intensa de estudos e trabalho.',
      url: 'https://www.marcospaulosilva.com/bio',
      icon: 'bi bi-capsule',
      external: true
    }
  ];

  spotlightCards: BioLink[] = [
    {
      title: 'Projetos e cases',
      description: 'Veja como transformei desafios de negócio em experiências digitais escaláveis.',
      url: 'https://www.marcospaulosilva.com.br',
      image: 'assets/images/macbook.png',
      external: true
    },
    {
      title: 'LSG Assessoria Digital',
      description: 'Funil de vendas completo construído com foco em captação e conversão de leads B2B.',
      url: 'https://www.marcospaulosilva.com.br',
      image: 'assets/images/print-projetos/lsgblackfriday.png',
      external: true
    }
  ];

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.atualizarMetadados({
      title: 'Bio | Marcos Paulo Silva',
      description: 'Conecte-se comigo, explore projetos e descubra recursos gratuitos sobre tecnologia e desenvolvimento.',
      image: 'https://www.marcospaulosilva.com.br/assets/images/logo.png',
      url: 'https://www.marcospaulosilva.com.br/bio'
    });
  }
}

