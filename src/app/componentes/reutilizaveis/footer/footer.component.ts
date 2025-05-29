import { Component } from '@angular/core';
import { SwitchDiaNoiteComponent } from "../switch-dia-noite/switch-dia-noite.component";
import { DropdownIdiomasComponent } from "../dropdown-idiomas/dropdown-idiomas.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SwitchDiaNoiteComponent, DropdownIdiomasComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  menuAberto = false;
}