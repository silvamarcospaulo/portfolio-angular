import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temaIcone',
  standalone: true,
  pure: true
})
export class TemaIconePipe implements PipeTransform {
  transform(path: string | null | undefined, isDark: boolean | null | undefined): string {
    if (!path) return '';
    const dot = path.lastIndexOf('.');
    if (dot === -1) return path;
    const base = path.slice(0, dot).replace(/-dark$/, '');
    const ext = path.slice(dot);
    return isDark ? `${base}-dark${ext}` : `${base}${ext}`;
  }
}