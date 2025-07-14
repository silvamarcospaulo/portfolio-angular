import { Component, Input } from '@angular/core';
import { SwitchDiaNoiteComponent } from "../switch-dia-noite/switch-dia-noite.component";
import { DropdownIdiomasComponent } from "../dropdown-idiomas/dropdown-idiomas.component";
import { TranslateModule } from '@ngx-translate/core';
import { Link } from '../../../../model/link.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SwitchDiaNoiteComponent, DropdownIdiomasComponent, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() links: Link[] = [];
}