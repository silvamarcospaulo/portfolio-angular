import { Injectable } from '@angular/core';
import { Link } from '../../../model/link.model';

@Injectable({ providedIn: 'root' })
export class PersonalDataService {
  readonly github = 'https://www.github.com/silvamarcospaulo';
  readonly linkedin = 'https://www.linkedin.com/in/silvamarcospaulo';
  readonly instagram = 'https://www.instagram.com/marcospaulo.dev';
  readonly instagramHandle = '@marcospaulo.dev';
  readonly email = 'silvampsmarcospaulo@gmail.com';
  readonly emailHref = `mailto:silvampsmarcospaulo@gmail.com?subject=Contato%20do%20Portfólio&body=Olá%20Marcos,`;
  readonly portfolioUrl = 'https://www.marcospaulosilva.com.br';

  getSocialLinks(): Link[] {
    return [
      new Link({ url: this.github, icone: 'bi bi-github', nome: 'GitHub' }),
      new Link({ url: this.linkedin, icone: 'bi bi-linkedin', nome: 'LinkedIn' }),
      new Link({ url: this.instagram, icone: 'bi bi-instagram', nome: 'Instagram' }),
      new Link({ url: this.emailHref, icone: 'bi bi-envelope-fill', nome: 'Email' }),
    ];
  }
}
