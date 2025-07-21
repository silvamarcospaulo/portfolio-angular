import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface MetadadosPagina {
    title: string;
    description: string;
    image: string;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    constructor(
        private titleService: Title,
        private metaService: Meta,
        @Inject(DOCUMENT) private document: Document
    ) { }

    atualizarMetadados(metadados: MetadadosPagina): void {
        this.titleService.setTitle(metadados.title);

        this.metaService.updateTag({ name: 'description', content: metadados.description });
        this.metaService.updateTag({ property: 'og:title', content: metadados.title });
        this.metaService.updateTag({ property: 'og:description', content: metadados.description });
        this.metaService.updateTag({ property: 'og:image', content: metadados.image });
        this.metaService.updateTag({ property: 'og:url', content: metadados.url });

        let linkCanonical = this.document.querySelector("link[rel='canonical']");
        if (!linkCanonical) {
            linkCanonical = this.document.createElement('link');
            linkCanonical.setAttribute('rel', 'canonical');
            this.document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute('href', metadados.url);
    }
}