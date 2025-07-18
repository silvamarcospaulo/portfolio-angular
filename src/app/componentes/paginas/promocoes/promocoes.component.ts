import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { FooterComponent } from '../../reutilizaveis/footer/footer.component';
import { CardPromocaoComponent } from '../../reutilizaveis/card-promocao/card-promocao.component';
import { PROMOCOES } from '../../../data/promocoes';
import { Promocao } from '../../../../model/promocao.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-promocoes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, CardPromocaoComponent, RouterOutlet],
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.scss']
})
export class PromocoesComponent {
  tabs = ['home', 'mercado-livre', 'kabum', 'amazon', 'aliexpress', 'shopee'];
  activeTab = 'home';

  linkOriginal = '';
  linkAfiliado = '';

  newest: Promocao[] = PROMOCOES.slice(0, 3);
  trending: Promocao[] = PROMOCOES.slice(3, 6);

  filtrar(store: string): Promocao[] {
    return PROMOCOES.filter(p => p.store === store);
  }

  gerarLink() {
    this.linkAfiliado = this.linkOriginal
      ? `https://meuslinks.com?url=${encodeURIComponent(this.linkOriginal)}`
      : '';
  }
}
