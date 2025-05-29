import { Component } from '@angular/core';
import { SwitchDiaNoiteComponent } from "../switch-dia-noite/switch-dia-noite.component";
import { DropdownIdiomasComponent } from "../dropdown-idiomas/dropdown-idiomas.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SwitchDiaNoiteComponent, DropdownIdiomasComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuAberto = false;

  fecharMenu() {
    this.menuAberto = false;
  }
}