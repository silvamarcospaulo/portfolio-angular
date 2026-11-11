import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
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

  constructor(@Inject(PLATFORM_ID) platformId: object) {
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
      slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
    };

    const updateNearest = () => {
      const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const bounds = slide.getBoundingClientRect();
        const nextDistance = Math.abs(bounds.left + bounds.width / 2 - center);
        if (nextDistance < distance) {
          distance = nextDistance;
          nearest = index;
        }
      });

      updateActive(nearest);
    };

    viewport.addEventListener('scroll', updateNearest, { passive: true });

    const { gsap } = await import('gsap');

    if (this.destroyed) {
      viewport.removeEventListener('scroll', updateNearest);
      return;
    }

    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (min-height: 701px) and (prefers-reduced-motion: no-preference)', () => {
      if (slides.length < 2) return;

      const TRANSITION_OUT = 0.22;
      const TRANSITION_IN = 0.42;
      const GESTURE_GAP = 280;
      const NEXT_STEP_DELAY = 260;

      let currentIndex = 0;
      let transitioning = false;
      let lastTransitionEnd = 0;
      let gestureActive = false;
      let releaseDirection = 0;
      let gestureReset: ReturnType<typeof setTimeout> | undefined;
      let touchStartY: number | null = null;

      const isPinned = () => {
        const sectionBounds = section.getBoundingClientRect();
        const spacerBounds = section.parentElement?.getBoundingClientRect();
        return !!spacerBounds && Math.abs(sectionBounds.top) <= 3
          && spacerBounds.top <= 3 && spacerBounds.bottom > window.innerHeight + 3;
      };

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

        gsap.timeline({
          onComplete: () => {
            transitioning = false;
            lastTransitionEnd = performance.now();
          }
        })
          .to(slides[previous], {
            autoAlpha: 0,
            y: -direction * 14,
            duration: TRANSITION_OUT,
            ease: 'power1.in'
          })
          .set(slides[previous], { y: 0, pointerEvents: 'none' })
          .set(slides[index], { pointerEvents: 'auto' })
          .fromTo(slides[index], {
            autoAlpha: 0,
            y: direction * 25
          }, {
            autoAlpha: 1,
            y: 0,
            duration: TRANSITION_IN,
            ease: 'power2.out'
          });
      };

      const canAdvance = () => !transitioning && performance.now() - lastTransitionEnd >= NEXT_STEP_DELAY;

      const advance = (direction: number) => {
        if (!canAdvance()) return false;
        const next = currentIndex + direction;
        if (next < 0 || next >= slides.length) return false;
        show(next);
        return true;
      };

      const clearGesture = () => {
        if (gestureReset) clearTimeout(gestureReset);
        gestureActive = false;
        releaseDirection = 0;
      };

      const onWheel = (event: WheelEvent) => {
        if (!isPinned() || event.ctrlKey || Math.abs(event.deltaY) < 1) return;

        const direction = Math.sign(event.deltaY);

        if (gestureReset) clearTimeout(gestureReset);
        gestureReset = setTimeout(clearGesture, GESTURE_GAP);

        if (gestureActive) {
          if (releaseDirection !== direction && event.cancelable) event.preventDefault();
          return;
        }

        gestureActive = true;

        const next = currentIndex + direction;
        if (next < 0 || next >= slides.length) {
          if (canAdvance()) {
            releaseDirection = direction;
            return;
          }
          if (event.cancelable) event.preventDefault();
          return;
        }

        if (event.cancelable) event.preventDefault();
        advance(direction);
      };

      const onTouchStart = (event: TouchEvent) => {
        touchStartY = isPinned() ? event.touches[0]?.clientY ?? null : null;
      };

      const onTouchMove = (event: TouchEvent) => {
        if (touchStartY === null || !isPinned()) return;
        const delta = touchStartY - (event.touches[0]?.clientY ?? touchStartY);
        const next = currentIndex + Math.sign(delta);
        if (Math.abs(delta) > 12 && next >= 0 && next < slides.length && event.cancelable) {
          event.preventDefault();
        }
      };

      const onTouchEnd = (event: TouchEvent) => {
        if (touchStartY === null || !isPinned()) return;
        const delta = touchStartY - (event.changedTouches[0]?.clientY ?? touchStartY);
        touchStartY = null;
        if (Math.abs(delta) >= 35) advance(Math.sign(delta));
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (!isPinned() || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
        const target = event.target;
        if (target instanceof HTMLElement && target.closest('a, button, input, textarea, select, [contenteditable="true"]')) return;

        const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key) ? 1 :
          ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0;
        if (!direction) return;

        const next = currentIndex + direction;
        if (next < 0 || next >= slides.length) return;

        event.preventDefault();
        advance(direction);
      };

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
      window.addEventListener('keydown', onKeyDown);

      show(0, true);

      return () => {
        clearGesture();
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('keydown', onKeyDown);
        gsap.killTweensOf(slides);
        gsap.set(slides, { clearProps: 'all' });
      };
    });

    this.disposeAnimation = () => {
      media.revert();
      viewport.removeEventListener('scroll', updateNearest);
    };

    updateNearest();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.disposeAnimation?.();
  }
}
