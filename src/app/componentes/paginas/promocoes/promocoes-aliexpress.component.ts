import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { FooterComponent } from '../../reutilizaveis/footer/footer.component';
import { CardPromocaoComponent } from '../../reutilizaveis/card-promocao/card-promocao.component';
import { PROMOCOES } from '../../../data/promocoes';
import { Promocao } from '../../../../model/promocao.model';

@Component({
  selector: 'app-promocoes-aliexpress',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CardPromocaoComponent],
  templateUrl: './promocoes-aliexpress.component.html',
  styleUrls: ['./promocoes-aliexpress.component.scss']
})
export class PromocoesAliexpressComponent {
  produtos: Promocao[] = PROMOCOES.filter(p => p.store === 'aliexpress');
}
