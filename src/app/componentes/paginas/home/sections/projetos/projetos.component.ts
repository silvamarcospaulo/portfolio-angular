import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Projeto } from '../../../../../../model/projeto/projeto.model';
import { CardProjetosComponent } from './card-projetos/card-projetos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [TranslateModule, CommonModule, CardProjetosComponent],
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})

export class ProjetosComponent {
  @Input() listaDeProjetos!: Projeto[];

  projetoAtualIndex = 0;
  isAnimating = false;
  duration = 500;

  private isCoarse = matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  private startX = 0;
  private startY = 0;
  private startTime = 0;
  private swiping = false;

  get projetoAtual(): Projeto {
    return this.listaDeProjetos[this.projetoAtualIndex];
  }

  get hasPrev(): boolean {
    return this.projetoAtualIndex > 0;
  }

  get hasNext(): boolean {
    return this.listaDeProjetos?.length
      ? this.projetoAtualIndex < this.listaDeProjetos.length - 1
      : false;
  }

  get projetoAnterior() {
    return this.hasPrev ? this.listaDeProjetos[this.projetoAtualIndex - 1] : null;
  }

  get projetoProximo() {
    return this.hasNext ? this.listaDeProjetos[this.projetoAtualIndex + 1] : null;
  }

  proximo() {
    if (this.isAnimating || !this.hasNext) return;
    this.isAnimating = true;
    this.projetoAtualIndex++;
    setTimeout(() => this.isAnimating = false, this.duration);
  }

  anterior() {
    if (this.isAnimating || !this.hasPrev) return;
    this.isAnimating = true;
    this.projetoAtualIndex--;
    setTimeout(() => this.isAnimating = false, this.duration);
  }

  irParaAnterior() { this.anterior(); }
  irParaProximo() { this.proximo(); }

  onTouchStart(e: TouchEvent) {
    if (!this.isCoarse || e.touches.length !== 1) return;
    const t = e.touches[0];
    this.startX = t.clientX;
    this.startY = t.clientY;
    this.startTime = Date.now();
    this.swiping = true;
  }

  onTouchMove(e: TouchEvent) {
    if (!this.swiping || !this.isCoarse) return;
    const t = e.touches[0];
    const dx = t.clientX - this.startX;
    const dy = t.clientY - this.startY;
    if (Math.abs(dx) > Math.abs(dy) * 1.5) e.preventDefault();
  }

  onTouchEnd() {
    if (!this.swiping || !this.isCoarse) return;
    this.swiping = false;
    const dt = Date.now() - this.startTime;
    const threshold = 60;
    const velocityBoost = dt < 220 ? 30 : 0;
    const endX = this.startX;
    const endY = this.startY;
    const dx = (window as any).lastTouchX !== undefined ? (window as any).lastTouchX - endX : 0;
    const dy = (window as any).lastTouchY !== undefined ? (window as any).lastTouchY - endY : 0;
    if (Math.abs(dx) <= Math.abs(dy) * 1.2) return;
    if (dx <= -(threshold - velocityBoost) && this.hasNext) { this.proximo(); return; }
    if (dx >= (threshold - velocityBoost) && this.hasPrev) { this.anterior(); return; }
  }
}