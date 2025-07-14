import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MenuRedesSociaisComponent } from '../../../../reutilizaveis/menu-redes-sociais/menu-redes-sociais.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [TranslateModule, MenuRedesSociaisComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent {
}