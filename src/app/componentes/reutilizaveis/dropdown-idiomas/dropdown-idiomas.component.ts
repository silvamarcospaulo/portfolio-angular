import { Component, ElementRef, HostListener, Input, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IdiomaService, Linguagem } from '../../../../core/services/idioma/idioma.service';

@Component({
  selector: 'app-dropdown-idiomas',
  standalone: true,
  templateUrl: './dropdown-idiomas.component.html',
  styleUrls: ['./dropdown-idiomas.component.scss'],
})
export class DropdownIdiomasComponent {
  private static nextId = 0;

  @Input() direction: 'up' | 'down' = 'down';

  linguagens: Linguagem[] = [];
  linguagemSelecionada!: Signal<Linguagem>;
  isOpen = false;
  readonly menuId = `dropdown-idiomas-menu-${DropdownIdiomasComponent.nextId++}`;

  constructor(
    private idiomaService: IdiomaService,
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.linguagens = this.idiomaService.getLinguagens();
    this.linguagemSelecionada = toSignal(this.idiomaService.linguagemSelecionada$, {
      initialValue: this.idiomaService.linguagemSelecionadaSubject.value,
    });
  }

  aoClicarEmIdiomas(): void {
    this.isOpen = !this.isOpen;
  }

  selecionarLinguagem(lang: Linguagem): void {
    this.idiomaService.selecionarLinguagem(lang);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  fecharAoClicarFora(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  fecharComEscape(): void {
    this.isOpen = false;
  }
}
