import { Component, Input, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ListaCard } from "./lista-card/lista-card.component";
import { SliderItem } from '../../../../../../../model/lista-card/slider-item';

@Component({
  standalone: true,
  selector: 'app-lista-slider',
  imports: [ListaCard],
  templateUrl: './lista-slider.component.html',
  styleUrl: './lista-slider.component.scss'
})
export class ListaSliderComponent implements AfterViewInit {
  @Input() items!: SliderItem[];
  @Input() duration = 10;
  @Input() fade = 60;
  @Input() direction: 'left' | 'right' = 'left';

  copies: null[] = [null, null, null];

  get d() { return `${this.duration}s`; }

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.calcLayout();
    }
  }

  @HostListener('window:resize')
  calcLayout(): void {
    const viewport = this.el.nativeElement.querySelector('#slider-viewport') as HTMLElement | null;
    const firstTrack = this.el.nativeElement.querySelector('.slider-track') as HTMLElement | null;
    if (!viewport || !firstTrack) return;

    const trackW = firstTrack.scrollWidth;
    const viewW = viewport.clientWidth;
    if (trackW <= 0) return;

    // enough copies so content always fills viewport + one full animation step
    const needed = Math.max(3, Math.ceil((viewW * 2) / trackW) + 1);
    if (this.copies.length !== needed) {
      this.copies = Array(needed).fill(null);
      this.cdr.detectChanges();
    }

    const runner = this.el.nativeElement.querySelector('.slider-runner') as HTMLElement | null;
    runner?.style.setProperty('--track-w', trackW + 'px');
  }
}
