import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { FooterComponent } from '../../reutilizaveis/footer/footer.component';
import { CardPromocaoComponent } from '../../reutilizaveis/card-promocao/card-promocao.component';
import { PROMOCOES } from '../../data/promocoes';
import { Promocao } from '../../../model/promocao.model';

@Component({
  selector: 'app-promocoes-kabum',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CardPromocaoComponent],
  templateUrl: './promocoes-kabum.component.html',
  styleUrls: ['./promocoes-kabum.component.scss']
})
export class PromocoesKabumComponent {
  produtos: Promocao[] = PROMOCOES.filter(p => p.store === 'kabum');
}
