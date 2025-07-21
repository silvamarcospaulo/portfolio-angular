import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produto } from '../../model/produto/produto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
    private api = `${environment.apiUrl}/produtos`;

    constructor(private http: HttpClient) {}

    listar(pagina = 1, limite = 50): Observable<Produto[]> {
        return this.http
            .get<{ items: Produto[] }>(`${this.api}?pagina=${pagina}&limite=${limite}`)
            .pipe(map(r => r.items));
    }

    buscarPorId(id: string): Observable<Produto | undefined> {
        return this.listar(1, 1000).pipe(
            map(items => items.find(p => p.id === id))
        );
    }

    incrementarAcessos(id: string): void {
        console.log(`Incrementando acessos para o produto com id: ${id}`);
    }
}