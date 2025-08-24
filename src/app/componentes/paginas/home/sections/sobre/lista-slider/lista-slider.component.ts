import { Component, Input } from '@angular/core';
import { ListaCard } from "./lista-card/lista-card.component";
import { SliderItem } from '../../../../../../../model/lista-card/slider-item';

@Component({
  standalone: true,
  selector: 'app-lista-slider',
  imports: [ListaCard],
  templateUrl: './lista-slider.component.html',
  styleUrl: './lista-slider.component.scss'
})

export class ListaSliderComponent {
  @Input() items!: SliderItem[];
  @Input() duration = 10;
  @Input() fade = 60;
  @Input() direction: 'left' | 'right' = 'left';

  get d() { return `${this.duration}s`; }
}