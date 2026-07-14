import { Component } from '@angular/core';
import { DropdownIdiomasComponent } from '../dropdown-idiomas/dropdown-idiomas.component';
import { SwitchDiaNoiteComponent } from '../switch-dia-noite/switch-dia-noite.component';

@Component({
  selector: 'app-footer-controls',
  standalone: true,
  imports: [DropdownIdiomasComponent, SwitchDiaNoiteComponent],
  templateUrl: './footer-controls.component.html',
  styleUrls: ['./footer-controls.component.scss'],
})
export class FooterControlsComponent {}
