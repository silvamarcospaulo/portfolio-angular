import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, InicioComponent, ProjetosComponent, FooterComponent, SobreComponent],
  providers: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listaDeProjetos: Projeto[] = [];
  listaDeExperienciasProfissionais: ExperienciaProfissional[] = [];
  links: Link[] = [];

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.atualizarMetadados({
      title: 'Portfólio - Marcos Paulo Silva',
      description: 'Marcos Paulo Silva - Desenvolvedor de Software',
      image: 'https://www.marcospaulosilva.com.br/assets/images/metadado.png',
      url: "https://www.marcospaulosilva.com.br"
    });

    this.listaDeProjetos = [
      new Projeto({
        url: 'https://goldesilverdistribuicao.com.br/',
        caminhoImagem: '/assets/images/print-projetos/goldesilverdistribuicao.png',
        palavraChave: 'CTA de vendas Gold & Silver Distribuição',
        titulo: 'Gold & Silver Distribuição',
        tipoDeProjeto: 'projetos.goldesilverdistribuicao.tipo',
        descricao: 'projetos.goldesilverdistribuicao.descricao',
        tecnologias: [
          new Link({ imagem: '/assets/images/icones/typescript.svg', nome: 'TypeScript' }),
          new Link({ imagem: '/assets/images/icones/angular.svg', nome: 'Angular' })
        ]
      }),
      // new Projeto({
      //   url: 'https://jbrsuitehotel.com.br/',
      //   caminhoImagem: '/assets/images/print-projetos/jbrsuitehotel.png',
      //   palavraChave: 'Landing Page JBR Suite Hotel',
      //   titulo: 'RJA Freios',
      //   tipoDeProjeto: 'projetos.rjafreios.tipo',
      //   descricao: 'projetos.rjafreios.descricao',
      //   tecnologias: [
      //     new Link({ imagem: '/assets/images/icones/javascript.svg', nome: 'JavaScript' }),
      //     new Link({ imagem: '/assets/images/icones/tailwind.svg', nome: 'Tailwind' })
      //   ]
      // }),
      // new Projeto({
      //   url: 'https://062uniformes.com',
      //   caminhoImagem: '/assets/images/print-projetos/062uniformes.png',
      //   palavraChave: 'E-commerce 062 Uniformes',
      //   titulo: '062 Uniformes',
      //   tipoDeProjeto: 'projetos.062uniformes.tipo',
      //   descricao: 'projetos.062uniformes.descricao',
      //   tecnologias: [
      //     new Link({ icone: 'bi bi-wordpress', nome: 'WordPress' })
      //   ]
      // }),
      new Projeto({
        url: 'https://vorixagencia.com.br/',
        caminhoImagem: '../../../../assets/images/print-projetos/lsgblackfriday.png',
        palavraChave: 'Funil de Vendas Vorix Agência',
        titulo: 'Vorix Agência',
        tipoDeProjeto: 'projetos.lsgassessoriadigital.tipo',
        descricao: 'projetos.lsgassessoriadigital.descricao',
        tecnologias: [
          new Link({ imagem: '/assets/images/icones/javascript.svg', nome: 'JavaScript' }),
          new Link({ imagem: '/assets/images/icones/tailwind.svg', nome: 'Tailwind' })
        ]
      }),

    ];

    this.listaDeExperienciasProfissionais = [
      new ExperienciaProfissional(
        'experiencia-profisisonal.invent-software.estagio.cargo',
        'Invent Software',
        'experiencia-profisisonal.invent-software.estagio.inicio',
        'experiencia-profisisonal.invent-software.estagio.fim',
        'experiencia-profisisonal.invent-software.estagio.descricao',
        [
          new Habilidade("C# .NET"),
          new Habilidade("SAP UI5"),
          new Habilidade("API Rest"),
          new Habilidade("FluentMigrator"),
          new Habilidade("FluentValidation"),
          new Habilidade("Linq2DB"),
          new Habilidade("SQL Server"),
          new Habilidade("Windows Forms"),
          new Habilidade("xUnit"),
        ]
      ),
      new ExperienciaProfissional(
        'experiencia-profisisonal.invent-software.tecnico-em-desenvolvido.cargo',
        'Invent Software',
        'experiencia-profisisonal.invent-software.tecnico-em-desenvolvido.inicio',
        'experiencia-profisisonal.invent-software.tecnico-em-desenvolvido.fim',
        'experiencia-profisisonal.invent-software.tecnico-em-desenvolvido.descricao',
        [
          new Habilidade("C# .NET"),
          new Habilidade("SAP UI5"),
          new Habilidade("RavenDB"),
          new Habilidade("NoSQL"),
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
          new Habilidade("C# .NET"),
          new Habilidade("SAP UI5"),
          new Habilidade("SQL Server"),
          new Habilidade("NoSQL"),
          new Habilidade("experiencia-profisisonal.invent-software.analista-i.habilidades.arquitetura-em-nuvem"),
        ]
      )
    ];

    this.links = [
      new Link({ nome: 'header.navbar.inicio', url: '#section-inicio' }),
      new Link({ nome: 'header.navbar.sobre', url: '#section-sobre' }),
      new Link({ nome: 'header.navbar.projetos', url: '#section-projetos' })
    ];
  }
}