import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
  private languageChange?: Subscription;

  constructor(@Inject(PLATFORM_ID) platformId: object, private readonly translate: TranslateService) {
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
    this.languageChange = this.translate.onLangChange.subscribe(() => requestAnimationFrame(() => ScrollTrigger.refresh()));

    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (distance() < 1) return;

      const items = Array.from(track.querySelectorAll<HTMLElement>('.timeline-item'));
      const highlightNearest = () => {
        const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
        let selected = -1;
        let difference = Number.POSITIVE_INFINITY;
        items.forEach((item, index) => {
          const bounds = item.getBoundingClientRect();
          const nextDifference = Math.abs(bounds.left + bounds.width / 2 - center);
          if (nextDifference < difference) {
            difference = nextDifference;
            selected = index;
          }
        });
        items.forEach((item, index) => item.classList.toggle('is-active', index === selected));
      };

      const animation = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: section,
          start: () => section.offsetHeight <= window.innerHeight ? 'center center' : 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: highlightNearest,
          onRefresh: highlightNearest
        }
      });

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
        items.forEach(item => item.classList.remove('is-active'));
      };
    });

    this.disposeAnimation = () => media.revert();
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.disposeAnimation?.();
    this.languageChange?.unsubscribe();
  }

  toggleDetails(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
