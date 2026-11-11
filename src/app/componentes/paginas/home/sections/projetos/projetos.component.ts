import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Projeto } from '../../../../../../model/projeto/projeto.model';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements AfterViewInit, OnDestroy {
  @Input() listaDeProjetos: Projeto[] = [];

  @ViewChild('projectsSection') private section?: ElementRef<HTMLElement>;
  @ViewChild('projectsViewport') private viewport?: ElementRef<HTMLElement>;
  @ViewChild('projectsTrack') private track?: ElementRef<HTMLElement>;

  readonly activeIndex = signal(0);

  private readonly browser: boolean;
  private destroyed = false;
  private disposeAnimation?: () => void;
  private languageChange?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private readonly translate: TranslateService
  ) {
    this.browser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.browser) return;

    const section = this.section?.nativeElement;
    const viewport = this.viewport?.nativeElement;
    const track = this.track?.nativeElement;
    if (!section || !viewport || !track) return;

    const slides = Array.from(track.querySelectorAll<HTMLElement>('.project-slide'));
    const updateNearest = () => {
      const bounds = viewport.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const nextDistance = Math.abs(rect.left + rect.width / 2 - center);
        if (nextDistance < distance) {
          nearest = index;
          distance = nextDistance;
        }
      });

      this.activeIndex.set(nearest);
      slides.forEach((slide, index) => slide.classList.toggle('is-active', index === nearest));
    };

    const onScroll = () => updateNearest();
    viewport.addEventListener('scroll', onScroll, { passive: true });

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]);

    if (this.destroyed) {
      viewport.removeEventListener('scroll', onScroll);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (min-height: 701px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (distance() < 1) return;

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
          onUpdate: updateNearest,
          onRefresh: updateNearest
        }
      });

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    });

    this.languageChange = this.translate.onLangChange.subscribe(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    this.disposeAnimation = () => {
      media.revert();
      viewport.removeEventListener('scroll', onScroll);
    };

    updateNearest();
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.disposeAnimation?.();
    this.languageChange?.unsubscribe();
  }
}
