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
  }

  toggleDetails(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  onPointerDown(event: PointerEvent): void {
    const track = this.timelineTrack?.nativeElement;
    if (!track || event.pointerType !== 'mouse' || event.button !== 0 || (event.target as HTMLElement).closest('button')) return;
    this.dragging = true;
    this.pointerStartX = event.clientX;
    this.pointerStartScroll = track.scrollLeft;
    track.classList.add('is-dragging');
  }

  onPointerMove(event: PointerEvent): void {
    const track = this.timelineTrack?.nativeElement;
    if (!track || !this.dragging) return;
    track.scrollLeft = this.pointerStartScroll - (event.clientX - this.pointerStartX);
  }

  onPointerUp(): void {
    this.dragging = false;
    this.timelineTrack?.nativeElement.classList.remove('is-dragging');
  }
}
