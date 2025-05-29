import { Component } from '@angular/core';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { FooterComponent } from "../../reutilizaveis/footer/footer.component";
import { InicioComponent } from "./sections/inicio/inicio.component";
import { ProjetosComponent } from "./sections/projetos/projetos.component";
import { ContatoComponent } from "./sections/contato/contato.component";
import { SobreComponent } from "./sections/sobre/sobre.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, InicioComponent, ProjetosComponent, ContatoComponent, FooterComponent, SobreComponent],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}