import { Component } from '@angular/core';
import { SwitchDiaNoiteComponent } from "../switch-dia-noite/switch-dia-noite.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SwitchDiaNoiteComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
}