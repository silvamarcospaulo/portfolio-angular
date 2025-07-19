import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPromocaoComponent } from '../../../reutilizaveis/card-promocao/card-promocao.component';

@Component({
  selector: 'app-promocoes-shopee',
  standalone: true,
  imports: [CommonModule, CardPromocaoComponent],
  templateUrl: './promocoes-shopee.component.html',
  styleUrls: ['./promocoes-shopee.component.scss']
})

export class PromocoesShopeeComponent {
}