import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ExperienciaProfissional } from '../../../../../../model/experienciaProfissional.model';
import { ListaSliderComponent } from "./lista-slider/lista-slider.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { SliderItem } from '../../../../../../model/lista-card/slider-item';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [TranslateModule, ListaSliderComponent, TimelineComponent],
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})

export class SobreComponent {
  @Input() listaDeExperienciasProfissionais: ExperienciaProfissional[] = [];
  duration = 50;
  fade = 1000;
  direction: 'left' | 'right' = 'left';

  items: SliderItem[] = [
    new SliderItem({
      iconeCaminho: '/assets/images/icones/javascript.svg',
      texto: 'JavaScript'
    }),

    new SliderItem({
      iconeCaminho: '/assets/images/icones/typescript.svg',
      texto: 'TypeScript'
    }),

    new SliderItem({
      iconeCaminho: '/assets/images/icones/angular.svg',
      texto: 'Angular'
    }),

    new SliderItem({
      iconeCaminho: '/assets/images/icones/csharp.png',
      texto: 'C#'
    }),

    new SliderItem({
      iconeCaminho: '/assets/images/icones/java.svg',
      texto: 'Java'
    })
  ];
}