import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Promocao } from '../../../../../model/promocao.model';
import { PROMOCOES } from '../../../../data/promocoes';

@Component({
    selector: 'app-promocoes-kabum',
    standalone: true,
    imports: [CommonModule, CardPromocaoComponent],
    templateUrl: './promocoes-kabum.component.html',
    styleUrls: ['./promocoes-kabum.component.scss']
})
export class PromocoesKabumComponent {
    produtos: Promocao[] = PROMOCOES.filter(p => p.store === 'kabum');
}