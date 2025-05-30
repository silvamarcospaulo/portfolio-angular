import { Component } from '@angular/core';
import { SwitchDiaNoiteComponent } from "../switch-dia-noite/switch-dia-noite.component";
import { DropdownIdiomasComponent } from "../dropdown-idiomas/dropdown-idiomas.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SwitchDiaNoiteComponent, DropdownIdiomasComponent, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {
  menuAberto = false;
}