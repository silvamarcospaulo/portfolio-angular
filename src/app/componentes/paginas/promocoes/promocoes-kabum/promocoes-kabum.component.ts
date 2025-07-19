import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPromocaoComponent } from '../../../reutilizaveis/card-promocao/card-promocao.component';

@Component({
    selector: 'app-promocoes-kabum',
    standalone: true,
    imports: [CommonModule, CardPromocaoComponent],
    templateUrl: './promocoes-kabum.component.html',
    styleUrls: ['./promocoes-kabum.component.scss']
})

export class PromocoesKabumComponent {
}