import { Component } from '@angular/core';
import { HeaderComponent } from "../../reutilizaveis/header/header.component";
import { FooterComponent } from "../../reutilizaveis/footer/footer.component";

@Component({
  selector: 'app-afiliados-links',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './afiliados-links.component.html',
  styleUrls: ['./afiliados-links.component.scss']
})
export class AfiliadosLinksComponent {

}
