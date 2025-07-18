import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPromocaoComponent } from '../../../reutilizaveis/card-promocao/card-promocao.component';
import { PROMOCOES } from '../../../../data/promocoes';
import { Promocao } from '../../../../../model/promocao.model';

@Component({
  selector: 'app-promocoes-mercado-livre',
  standalone: true,
  imports: [CommonModule, CardPromocaoComponent],
  templateUrl: './promocoes-mercado-livre.component.html',
  styleUrls: ['./promocoes-mercado-livre.component.scss']
})

export class PromocoesMercadoLivreComponent {
  produtos: Promocao[] = PROMOCOES.filter(p => p.store === 'mercado-livre');
}