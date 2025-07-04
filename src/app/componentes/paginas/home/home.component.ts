import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { FooterComponent } from "../../reutilizaveis/footer/footer.component";
import { InicioComponent } from "./sections/inicio/inicio.component";
import { ProjetosComponent } from "./sections/projetos/projetos.component";
import { ContatoComponent } from "./sections/contato/contato.component";
import { SobreComponent } from "./sections/sobre/sobre.component";
import { Projeto } from '../../../../model/projeto.model';
import { ExperienciaProfissional } from '../../../../model/experienciaProfissional.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, InicioComponent, ProjetosComponent, ContatoComponent, FooterComponent, SobreComponent],
  providers: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listaDeProjetos: Projeto[] = [];
  listaDeExperienciasProfissionais: ExperienciaProfissional[] = [];

  ngOnInit(): void {
    this.listaDeProjetos = [
      new Projeto(
        'https://062uniformes.com/torcida-jovem-unificada',
        '../../../../assets/images/print-projetos/062uniformes.png',
        'E-commerce 062 Uniformes',
        '062 Uniformes',
        'E-commerce',
        'Loja virtual de uniformes personalizados.'
      ),
      new Projeto(
        'https://lsgassessoriadigital.com/',
        '../../../../assets/images/print-projetos/lsgblackfriday.png',
        'Funil de Vendas LSG Digital',
        'LSG Digital',
        'Funil de Vendas',
        'Funil de vendas para serviços digitais.'
      ),
      new Projeto(
        'https://jbrsuitehotel.com.br/',
        '../../../../assets/images/print-projetos/rjafreios.png',
        'Landing Page JBR Suite Hotel',
        'JBR Suite Hotel',
        'Landing Page',
        'Site para reservas de hospedaria.'
      ),
      new Projeto(
        'https://rjafreios.com.br/',
        '../../../../assets/images/print-projetos/jbrsuitehotel.png',
        'Landing Page RJA Freios',
        'RJA Freios',
        'Landing Page',
        'Landing page para oficina automotiva.'
      )
    ];

    this.listaDeExperienciasProfissionais = [
      new ExperienciaProfissional(
        'Designer Gráfico',
        'Conexão Digital',
        '01/2021',
        '05/2023',
        'Criação de artes para material gráfico e digitais utilizando Photoshop, Illustrator e Corel Draw'
      ),
      new ExperienciaProfissional(
        'Estágio em Desenvolvimento de Software',
        'Invent Software',
        '05/2024',
        '10/2024',
        'Desenvolvimento de aplicações em C# (.NET), SAPUI 5, Windows Forms.'
      ),
      new ExperienciaProfissional(
        'Auxiliar de Desenvolvimento de Software',
        'Invent Software',
        '11/2024',
        'Atualmente',
        'Desenvolvimento fullstack de aplicações em C# (.NET), SAPUI 5'
      )
    ];
  }
}