import { Component, Input } from '@angular/core';
import { SliderItem } from '../../../../../../../../model/lista-card/slider-item';

@Component({

  selector: 'app-lista-card',
  imports: [],
  templateUrl: './lista-card.component.html',
  styleUrl: './lista-card.component.scss'
})

export class ListaCard {
  @Input() item: SliderItem = new SliderItem();
}