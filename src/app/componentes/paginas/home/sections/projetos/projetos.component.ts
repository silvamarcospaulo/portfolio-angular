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
    if (slides.length === 0) return;

    const updateActive = (index: number) => {
      this.activeIndex.set(index);
      slides.forEach((slide, itemIndex) => slide.classList.toggle('is-active', itemIndex === index));
    };

    const updateNearest = () => {
      const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
      let nearest = 0;
      let difference = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const bounds = slide.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - center);
        if (distance < difference) {
          difference = distance;
          nearest = index;
        }
      });

      updateActive(nearest);
    };

    viewport.addEventListener('scroll', updateNearest, { passive: true });

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]);

    if (this.destroyed) {
      viewport.removeEventListener('scroll', updateNearest);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (min-height: 701px) and (prefers-reduced-motion: no-preference)', () => {
      if (track.scrollWidth <= viewport.clientWidth) return;

      const transitionDuration = 0.65;
      const entryDelay = 550;
      const stopDelay = 0.35;
      let currentIndex = 0;
      let transitioning = false;
      let gestureLocked = false;
      let entryTime = 0;

      const positionFor = (index: number) => {
        const trackBounds = track.getBoundingClientRect();
        const slideBounds = slides[index].getBoundingClientRect();
        const offset = slideBounds.left - trackBounds.left + slideBounds.width / 2 - viewport.clientWidth / 2;
        return -Math.min(Math.max(offset, 0), track.scrollWidth - viewport.clientWidth);
      };

      const animateTo = (index: number, immediate = false) => {
        currentIndex = index;
        updateActive(index);
        gsap.killTweensOf(track);

        if (immediate) {
          gsap.set(track, { x: positionFor(index) });
          transitioning = false;
          return;
        }

        transitioning = true;
        gsap.to(track, {
          x: positionFor(index),
          duration: transitionDuration,
          ease: 'power2.inOut',
          onComplete: () => {
            transitioning = false;
          }
        });
      };

      const wheelObserver = ScrollTrigger.observe({
        target: window,
        type: 'wheel,touch',
        tolerance: 14,
        preventDefault: true,
        onStopDelay: stopDelay,
        onStop: () => {
          gestureLocked = false;
        },
        onDown: () => advance(1),
        onUp: () => advance(-1)
      });

      wheelObserver.disable();

      const pin = ScrollTrigger.create({
        trigger: section,
        pin: section,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight, 700)}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: self => {
          entryTime = performance.now();
          gestureLocked = false;
          animateTo(0, true);
          wheelObserver.enable();
          self.scroll(self.start + 1);
        },
        onEnterBack: self => {
          entryTime = performance.now();
          gestureLocked = false;
          animateTo(slides.length - 1, true);
          wheelObserver.enable();
          self.scroll(self.end - 1);
        },
        onLeave: () => wheelObserver.disable(),
        onLeaveBack: () => wheelObserver.disable(),
        onRefresh: () => {
          gsap.set(track, { x: positionFor(currentIndex) });
        }
      });

      function advance(direction: number) {
        if (gestureLocked || transitioning || performance.now() - entryTime < entryDelay) return;

        gestureLocked = true;
        const next = currentIndex + direction;
        if (next < 0 || next >= slides.length) {
          wheelObserver.disable();
          pin.scroll(direction > 0 ? pin.end + 2 : pin.start - 2);
          return;
        }

        animateTo(next);
      }

      const onKeyDown = (event: KeyboardEvent) => {
        if (!pin.isActive || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
        const target = event.target;
        if (target instanceof HTMLElement && target.closest('a, button, input, textarea, select, [contenteditable="true"]')) return;

        const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key) ? 1 :
          ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0;
        if (direction === 0) return;

        event.preventDefault();
        if (!transitioning) {
          gestureLocked = false;
          entryTime = 0;
          advance(direction);
        }
      };

      window.addEventListener('keydown', onKeyDown);

      return () => {
        wheelObserver.kill();
        pin.kill();
        gsap.killTweensOf(track);
        gsap.set(track, { clearProps: 'transform' });
        window.removeEventListener('keydown', onKeyDown);
        transitioning = false;
      };
    });

    this.languageChange = this.translate.onLangChange.subscribe(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    this.disposeAnimation = () => {
      media.revert();
      viewport.removeEventListener('scroll', updateNearest);
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
