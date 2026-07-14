import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  scrollTo(id: string): void {
    if (!this.isBrowser) return;

    const el = document.getElementById(id);
    if (!el) return;

    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerHeight * 0.1;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onScroll(callback: (scrollY: number) => void): () => void {
    if (!this.isBrowser) return () => {};

    const handler = () => callback(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }
}
