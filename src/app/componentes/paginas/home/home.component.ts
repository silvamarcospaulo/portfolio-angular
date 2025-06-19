import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { FooterComponent } from "../../reutilizaveis/footer/footer.component";
import { InicioComponent } from "./sections/inicio/inicio.component";
import { ProjetosComponent } from "./sections/projetos/projetos.component";
import { ContatoComponent } from "./sections/contato/contato.component";
import { SobreComponent } from "./sections/sobre/sobre.component";
import { ExperienciasProfissionaisComponent } from "./sections/experiencias-profissionais/experiencias-profissionais.component";
import { Projeto } from '../../../../model/projeto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, InicioComponent, ProjetosComponent, ContatoComponent, FooterComponent, SobreComponent, ExperienciasProfissionaisComponent],
  providers: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listaDeProjetos: Projeto[] = [];

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
  }
}