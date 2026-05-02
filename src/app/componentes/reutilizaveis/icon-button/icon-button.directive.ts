import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'button[appIconButton], a[appIconButton]',
  standalone: true
})
export class IconButtonDirective {
  @Input() shape: 'circle' | 'square' = 'circle';

  @HostBinding('class') get classes(): string {
    return `icon-btn icon-btn--${this.shape} soft-ui-container soft-ui-container-hover`;
  }
}
