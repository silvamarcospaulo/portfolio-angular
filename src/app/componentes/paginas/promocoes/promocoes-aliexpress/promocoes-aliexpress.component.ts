import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPromocaoComponent } from '../../../reutilizaveis/card-promocao/card-promocao.component';
import { PROMOCOES } from '../../../../data/promocoes';
import { Promocao } from '../../../../../model/promocao.model';
import { PromocoesFooterComponent } from "../promocoes-footer/promocoes-footer.component";
import { PromocoesHeaderComponent } from "../promocoes-header/promocoes-header.component";

@Component({
  selector: 'app-promocoes-aliexpress',
  standalone: true,
  imports: [CommonModule, CardPromocaoComponent, PromocoesFooterComponent, PromocoesHeaderComponent],
  templateUrl: './promocoes-aliexpress.component.html',
  styleUrls: ['./promocoes-aliexpress.component.scss']
})

export class PromocoesAliexpressComponent {
  produtos: Promocao[] = PROMOCOES.filter(p => p.store === 'aliexpress');
}