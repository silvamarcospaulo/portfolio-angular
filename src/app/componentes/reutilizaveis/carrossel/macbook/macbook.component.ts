// macbook.component.ts
import { Component, Input } from '@angular/core';
import { Imagem } from '../../../../../model/imagem.model';

@Component({
  selector: 'app-macbook',
  standalone: true,
  imports: [],
  templateUrl: './macbook.component.html',
  styleUrls: ['./macbook.component.scss']
})

export class MacbookComponent {
  @Input() imagem!: Imagem;
}