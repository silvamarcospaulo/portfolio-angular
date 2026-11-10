import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
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

  @ViewChild('timelineSection') private timelineSection?: ElementRef<HTMLElement>;
  @ViewChild('timelineViewport') private timelineViewport?: ElementRef<HTMLElement>;
  @ViewChild('timelineTrack') private timelineTrack?: ElementRef<HTMLElement>;

  expandedIndex: number | null = null;

  private readonly browser: boolean;
  private destroyed = false;
  private disposeAnimation?: () => void;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.browser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.browser) return;

    const section = this.timelineSection?.nativeElement;
    const viewport = this.timelineViewport?.nativeElement;
    const track = this.timelineTrack?.nativeElement;
    if (!section || !viewport || !track) return;

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]);

    if (this.destroyed) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (distance() < 1) return;

      const animation = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: section,
          start: 'center center',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    });

    this.disposeAnimation = () => media.revert();
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.disposeAnimation?.();
  }

  toggleDetails(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
