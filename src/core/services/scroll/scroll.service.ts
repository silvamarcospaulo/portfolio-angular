import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
    scrollTo(id: string) {
        const el = document.getElementById(id);
        if (el) {
            const elementPosition = el.getBoundingClientRect().top + window.scrollY;
            const offset = window.innerHeight * 0.1;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    }
}