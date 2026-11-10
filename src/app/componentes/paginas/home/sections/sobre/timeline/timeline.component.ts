import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ExperienciaProfissional } from '../../../../../../../model/experiencia-profissional/experiencia-profissional.model';

@Component({
  standalone: true,
  selector: 'app-timeline',
  imports: [TranslateModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  @Input() listaDeExperienciasProfissionais: ExperienciaProfissional[] = [];

  @ViewChild('timelineTrack') private timelineTrack?: ElementRef<HTMLElement>;
  @ViewChildren('timelineItem') private timelineItems?: QueryList<ElementRef<HTMLElement>>;

  expandedIndex: number | null = null;

  private observer?: IntersectionObserver;
  private pointerStartX = 0;
  private pointerStartScroll = 0;
  private dragging = false;
  private scrollTarget = 0;
  private scrollFrame = 0;
  private readonly browser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.browser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.browser) return;

    const items = this.timelineItems?.toArray() ?? [];

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      items.forEach(item => this.observer?.observe(item.nativeElement));
    } else {
      items.forEach(item => item.nativeElement.classList.add('is-visible'));
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.browser && this.scrollFrame) cancelAnimationFrame(this.scrollFrame);
  }

  toggleDetails(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  onWheel(event: WheelEvent): void {
    const track = this.timelineTrack?.nativeElement;
    if (!track || !this.browser || event.ctrlKey || !window.matchMedia('(min-width: 1024px)').matches) return;

    const maximum = track.scrollWidth - track.clientWidth;
    if (maximum <= 1) return;

    const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 20 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? track.clientWidth : 1;
    const delta = (Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX) * multiplier;
    if (!delta) return;

    const active = this.scrollFrame !== 0;
    const position = active ? this.scrollTarget : track.scrollLeft;
    const target = Math.max(0, Math.min(maximum, position + delta * 1.1));
    if (Math.abs(target - position) < 0.5) return;

    event.preventDefault();
    this.scrollTarget = target;
    if (!active) this.animateScroll();
  }

  private animateScroll(): void {
    const track = this.timelineTrack?.nativeElement;
    if (!track) {
      this.scrollFrame = 0;
      return;
    }

    const difference = this.scrollTarget - track.scrollLeft;
    if (Math.abs(difference) < 0.7) {
      track.scrollLeft = this.scrollTarget;
      this.scrollFrame = 0;
      return;
    }

    track.scrollLeft += difference * 0.2;
    this.scrollFrame = requestAnimationFrame(() => this.animateScroll());
  }

  onPointerDown(event: PointerEvent): void {
    const track = this.timelineTrack?.nativeElement;
    if (!track || event.pointerType !== 'mouse' || event.button !== 0 || (event.target as HTMLElement).closest('button')) return;
    if (this.scrollFrame) cancelAnimationFrame(this.scrollFrame);
    this.scrollFrame = 0;
    this.dragging = true;
    this.pointerStartX = event.clientX;
    this.pointerStartScroll = track.scrollLeft;
    track.classList.add('is-dragging');
  }

  onPointerMove(event: PointerEvent): void {
    const track = this.timelineTrack?.nativeElement;
    if (!track || !this.dragging) return;
    track.scrollLeft = this.pointerStartScroll - (event.clientX - this.pointerStartX);
    this.scrollTarget = track.scrollLeft;
  }

  onPointerUp(): void {
    this.dragging = false;
    this.timelineTrack?.nativeElement.classList.remove('is-dragging');
  }
}
