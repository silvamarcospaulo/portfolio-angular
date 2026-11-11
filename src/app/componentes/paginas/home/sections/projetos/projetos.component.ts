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
      if (slides.length < 2) return;

      const TRANSITION_OUT = 0.22;
      const TRANSITION_IN = 0.42;
      const ENTRY_DELAY = 450;
      const EXIT_DELAY = 200;
      let currentIndex = 0;
      let transitioning = false;
      let entryTime = 0;
      let lastTransitionEnd = 0;

      const show = (index: number, immediate = false) => {
        const previous = currentIndex;
        currentIndex = index;
        updateActive(index);
        gsap.killTweensOf(slides);

        if (immediate || previous === index) {
          gsap.set(slides, { autoAlpha: 0, y: 0, pointerEvents: 'none' });
          gsap.set(slides[index], { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
          transitioning = false;
          return;
        }

        transitioning = true;
        const direction = Math.sign(index - previous);
        const outgoing = slides[previous];
        const incoming = slides[index];

        gsap.timeline({
          onComplete: () => {
            transitioning = false;
            lastTransitionEnd = performance.now();
          }
        })
          .to(outgoing, { autoAlpha: 0, y: direction * -14, duration: TRANSITION_OUT, ease: 'power1.in' })
          .set(outgoing, { y: 0, pointerEvents: 'none' })
          .set(incoming, { pointerEvents: 'auto' })
          .fromTo(
            incoming,
            { autoAlpha: 0, y: direction * 25 },
            { autoAlpha: 1, y: 0, duration: TRANSITION_IN, ease: 'power2.out' }
          );
      };

      let wheelGestureActive = false;
      let wheelRelease: ReturnType<typeof setTimeout> | undefined;
      let touchStartY: number | null = null;

      const resetGesture = () => {
        wheelGestureActive = false;
        if (wheelRelease) clearTimeout(wheelRelease);
      };

      const pin = ScrollTrigger.create({
        trigger: section,
        pin: section,
        refreshPriority: -1,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * (slides.length + 1), 1500)}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: self => {
          entryTime = performance.now();
          resetGesture();
          show(0, true);
          window.scrollTo({ top: self.start + 1, behavior: 'instant' });
        },
        onEnterBack: self => {
          entryTime = performance.now();
          resetGesture();
          show(slides.length - 1, true);
          window.scrollTo({ top: self.end - 1, behavior: 'instant' });
        },
        onLeave: resetGesture,
        onLeaveBack: resetGesture
      });

      const advance = (direction: number) => {
        if (transitioning || performance.now() - entryTime < ENTRY_DELAY) return;

        const next = currentIndex + direction;
        if (next < 0 || next >= slides.length) {
          if (performance.now() - lastTransitionEnd < EXIT_DELAY) return;
          window.scrollTo({ top: direction > 0 ? pin.end + 40 : pin.start - 40, behavior: 'instant' });
          return;
        }

        show(next);
      };

      const onWheel = (event: WheelEvent) => {
        if (!pin.isActive || event.ctrlKey) return;
        event.preventDefault();
        if (event.deltaY === 0) return;

        if (wheelRelease) clearTimeout(wheelRelease);
        const newGesture = !wheelGestureActive;
        wheelGestureActive = true;
        wheelRelease = setTimeout(() => {
          wheelGestureActive = false;
        }, 300);

        if (newGesture) advance(Math.sign(event.deltaY));
      };

      const onTouchStart = (event: TouchEvent) => {
        if (pin.isActive) touchStartY = event.touches[0]?.clientY ?? null;
      };

      const onTouchMove = (event: TouchEvent) => {
        if (pin.isActive && touchStartY !== null) event.preventDefault();
      };

      const onTouchEnd = (event: TouchEvent) => {
        if (!pin.isActive || touchStartY === null) return;
        const distance = touchStartY - (event.changedTouches[0]?.clientY ?? touchStartY);
        touchStartY = null;
        if (Math.abs(distance) >= 30) advance(Math.sign(distance));
      };

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd, { passive: true });

      const onKeyDown = (event: KeyboardEvent) => {
        if (!pin.isActive || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
        const target = event.target;
        if (target instanceof HTMLElement && target.closest('a, button, input, textarea, select, [contenteditable="true"]')) return;

        const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key) ? 1 :
          ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0;
        if (!direction) return;

        event.preventDefault();
        if (!transitioning) {
          entryTime = 0;
          advance(direction);
        }
      };

      window.addEventListener('keydown', onKeyDown);
      show(0, true);

      return () => {
        pin.kill();
        resetGesture();
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        gsap.killTweensOf(slides);
        gsap.set(slides, { clearProps: 'all' });
        window.removeEventListener('keydown', onKeyDown);
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
