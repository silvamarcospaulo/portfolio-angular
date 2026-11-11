import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { InicioComponent } from "./sections/inicio/inicio.component";
import { ProjetosComponent } from "./sections/projetos/projetos.component";
import { SobreComponent } from "./sections/sobre/sobre.component";
import { Projeto } from '../../../../model/projeto/projeto.model';
import { ExperienciaProfissional } from '../../../../model/experiencia-profissional/experiencia-profissional.model';
import { Habilidade } from '../../../../model/experiencia-profissional/habilidade.model';
import { SeoService } from '../../../../core/services/seo/seo.service';
import { Link } from '../../../../model/link.model';
import { FooterComponent } from './sections/footer/footer.component';
import { HeaderComponent } from './sections/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { PersonalDataService } from '../../../../core/services/personal-data/personal-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, InicioComponent, ProjetosComponent, FooterComponent, SobreComponent, TranslateModule],
  providers: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listaDeProjetos: Projeto[] = [];
  listaDeExperienciasProfissionais: ExperienciaProfissional[] = [];
  links: Link[] = [];
  readonly specialtyAreas = [
    { key: 'backend', icon: 'bi bi-braces', skills: ['C# / .NET', 'Python', 'REST APIs'] },
    { key: 'architecture', icon: 'bi bi-diagram-3', skills: ['Microservices', 'Docker', 'SEFAZ'] },
    { key: 'data', icon: 'bi bi-database', skills: ['PostgreSQL', 'RavenDB', 'SQL / NoSQL'] },
    { key: 'frontend', icon: 'bi bi-window', skills: ['Angular', 'React', 'TypeScript'] }
  ];
  get contactEmail(): string { return this.personalData.emailHref; }

  constructor(
    private seoService: SeoService,
    private translate: TranslateService,
    private personalData: PersonalDataService
  ) { }

  ngOnInit(): void {
    this.atualizarMetadados();

    this.listaDeProjetos = [
      new Projeto({
        url: 'https://vorix-agencia.vercel.app',
        titulo: 'projetos.vorix-agencia.titulo',
        tipoDeProjeto: 'projetos.vorix-agencia.tipo',
        descricao: 'projetos.vorix-agencia.descricao',
        tecnologias: [
          new Link({ nome: 'Angular' }),
          new Link({ nome: 'TypeScript' })
        ]
      }),
      new Projeto({
        url: 'https://goldesilverdistribuicao.com.br/',
        urlSecundaria: 'https://gold-and-silver-landing-page.vercel.app',
        caminhoImagem: '/assets/images/print-projetos/goldesilverdistribuicao.png',
        titulo: 'projetos.goldesilverdistribuicao.titulo',
        tipoDeProjeto: 'projetos.goldesilverdistribuicao.tipo',
        descricao: 'projetos.goldesilverdistribuicao.descricao',
        tecnologias: [
          new Link({ nome: 'Angular' }),
          new Link({ nome: 'C# / .NET' })
        ]
      })
    ];

    this.listaDeExperienciasProfissionais = [
      new ExperienciaProfissional(
        'experiencia-profisisonal.invent-software.estagio.cargo',
        'Invent Software',
        'experiencia-profisisonal.invent-software.estagio.inicio',
        'experiencia-profisisonal.invent-software.estagio.fim',
        'experiencia-profisisonal.invent-software.estagio.descricao',
        [
          new Habilidade('habilidades.csharp'),
          new Habilidade('habilidades.sap-ui5'),
          new Habilidade('habilidades.api-rest'),
          new Habilidade('habilidades.fluent-migrator'),
          new Habilidade('habilidades.fluent-validation'),
          new Habilidade('habilidades.linq2db'),
          new Habilidade('habilidades.sql-server'),
          new Habilidade('habilidades.windows-forms'),
          new Habilidade('habilidades.xunit'),
        ]
      ),
      new ExperienciaProfissional(
        'experiencia-profisisonal.invent-software.tecnico-em-desenvolvido.cargo',
        'Invent Software',
        'experiencia-profisisonal.invent-software.tecnico-em-desenvolvido.inicio',
        'experiencia-profisisonal.invent-software.tecnico-em-desenvolvido.fim',
        'experiencia-profisisonal.invent-software.tecnico-em-desenvolvido.descricao',
        [
          new Habilidade('habilidades.csharp'),
          new Habilidade('habilidades.sap-ui5'),
          new Habilidade('habilidades.ravendb'),
          new Habilidade('habilidades.nosql'),
          new Habilidade("experiencia-profisisonal.invent-software.tecnico-em-desenvolvido.habilidades.arquitetura-em-nuvem"),
        ]
      ),
      new ExperienciaProfissional(
        'experiencia-profisisonal.invent-software.analista-i.cargo',
        'Invent Software',
        'experiencia-profisisonal.invent-software.analista-i.inicio',
        'experiencia-profisisonal.invent-software.analista-i.fim',
        'experiencia-profisisonal.invent-software.analista-i.descricao',
        [
          new Habilidade('habilidades.csharp'),
          new Habilidade('habilidades.sap-ui5'),
          new Habilidade('habilidades.sql-server'),
          new Habilidade('habilidades.nosql'),
          new Habilidade("experiencia-profisisonal.invent-software.analista-i.habilidades.arquitetura-em-nuvem"),
        ]
      ),
      new ExperienciaProfissional(
        'experiencia-profisisonal.invent-software.analista-ii.cargo',
        'Invent Software',
        'experiencia-profisisonal.invent-software.analista-ii.inicio',
        'experiencia-profisisonal.invent-software.analista-ii.fim',
        'experiencia-profisisonal.invent-software.analista-ii.descricao',
        [
          new Habilidade('habilidades.python'),
          new Habilidade('habilidades.react'),
          new Habilidade('habilidades.postgresql'),
          new Habilidade('habilidades.sdd'),
          new Habilidade('habilidades.api-rest')
        ]
      )
    ];

    this.links = [
      new Link({ nome: 'header.navbar.inicio', url: '#section-inicio' }),
      new Link({ nome: 'header.navbar.sobre', url: '#section-sobre' }),
      new Link({ nome: 'header.navbar.projetos', url: '#section-projetos' }),
      new Link({ nome: 'portfolio.contact.nav', url: '#section-contato' })
    ];
  }

  private atualizarMetadados(): void {
    this.seoService.atualizarMetadados({
      title: this.translate.instant('home.seo.title'),
      description: this.translate.instant('home.seo.description'),
      image: `${this.personalData.portfolioUrl}/assets/images/metadata.png`,
      url: this.personalData.portfolioUrl
    });
  }
}