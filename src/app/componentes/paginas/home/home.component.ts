import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { FooterComponent } from "../../reutilizaveis/footer/footer.component";
import { InicioComponent } from "./sections/inicio/inicio.component";
import { ProjetosComponent } from "./sections/projetos/projetos.component";
import { SobreComponent } from "./sections/sobre/sobre.component";
import { Projeto } from '../../../../model/projeto.model';
import { ExperienciaProfissional } from '../../../../model/experienciaProfissional.model';
import { Habilidade } from '../../../../model/habilidade.model';
import { SeoService } from '../../../.././services/seo/seo.service';
import { Link } from '../../../../model/link.model';

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
      image: 'https://www.marcospaulosilva.com.br/assets/images/logo.png',
      url: "https://www.marcospaulosilva.com.br"
    });

    this.listaDeProjetos = [
      new Projeto(
        'https://062uniformes.com/torcida-jovem-unificada',
        '../../../../assets/images/print-projetos/062uniformes.png',
        'E-commerce 062 Uniformes',
        '062 Uniformes',
        'projetos.062uniformes.tipo',
        'projetos.062uniformes.descricao'
      ),
      new Projeto(
        'https://lsgassessoriadigital.com/',
        '../../../../assets/images/print-projetos/lsgblackfriday.png',
        'Funil de Vendas LSG Digital',
        'LSG Digital',
        'projetos.lsgassessoriadigital.tipo',
        'projetos.lsgassessoriadigital.descricao'
      ),
      new Projeto(
        'https://rjafreios.com.br/',
        '../../../../assets/images/print-projetos/rjafreios.png',
        'Landing Page JBR Suite Hotel',
        'JBR Suite Hotel',
        'projetos.jbrsuitehotel.tipo',
        'projetos.jbrsuitehotel.descricao'
      ),
      new Projeto(
        'https://jbrsuitehotel.com.br/',
        '../../../../assets/images/print-projetos/jbrsuitehotel.png',
        'Landing Page RJA Freios',
        'RJA Freios',
        'projetos.rjafreios.tipo',
        'projetos.rjafreios.descricao'
      )
    ];

    this.listaDeExperienciasProfissionais = [
      new ExperienciaProfissional(
        'experiencias-profissionais.conexaodigital.cargo',
        'Conexão Digital',
        '01/2021',
        '05/2023',
        'experiencias-profissionais.conexaodigital.descricao',
        [
          new Habilidade("Corel Draw"),
          new Habilidade("PhotoShop"),
          new Habilidade("Illustrator")
        ]
      ),
      new ExperienciaProfissional(
        'experiencias-profissionais.inventsoftware-estagio.cargo',
        'Invent Software',
        '05/2024',
        '10/2024',
        'experiencias-profissionais.inventsoftware-estagio.descricao',
        [
          new Habilidade("C#"),
          new Habilidade("SAPUI 5"),
          new Habilidade("SQL Server"),
          new Habilidade("Windows Forms")
        ]
      ),
      new ExperienciaProfissional(
        'experiencias-profissionais.inventsoftware-auxiliar.cargo',
        'Invent Software',
        '11/2024',
        'Atualmente',
        'experiencias-profissionais.inventsoftware-auxiliar.descricao',
        [
          new Habilidade("C#"),
          new Habilidade("SAPUI 5"),
          new Habilidade("RavenDB"),
          new Habilidade("SCRUM"),
          new Habilidade("CI/CD")
        ]
      )
    ];

    this.links = [
      new Link('header.navbar.experiencia', '#section-experiencia'),
      new Link('header.navbar.habilidades', '#section-habilidades'),
      new Link('header.navbar.contato', '#section-contato')
    ];
  }
}