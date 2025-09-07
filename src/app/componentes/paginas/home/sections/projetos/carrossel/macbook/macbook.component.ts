import { Component, Input } from '@angular/core';
import { Projeto } from '../../../../../../../../model/projeto/projeto.model';

@Component({
  selector: 'app-macbook',
  standalone: true,
  imports: [],
  templateUrl: './macbook.component.html',
  styleUrls: ['./macbook.component.scss']
})

export class MacbookComponent {
  @Input() projeto!: Projeto;
}