import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
    incrementarAcessos(id: string): void {
        console.log(`Incrementando acessos para o produto com id: ${id}`);
    }
}