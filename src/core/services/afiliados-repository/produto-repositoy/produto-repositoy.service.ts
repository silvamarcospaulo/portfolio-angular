import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { Produto } from '../../../../model/produto/produto';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  private readonly apiUrl = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) { }

  async listar(pagina = 1, limite = 12) {
    return this.http.get<Produto[]>(`${this.apiUrl}?pagina=${pagina}&limite=${limite}`);
  }

  async criar(produto: any) {
    return this.http.post(this.apiUrl, produto);
  }

  async criarLote(produtos: any[]) {
    return this.http.post(`${this.apiUrl}/lote`, { produtos });
  }

  async obterPorId(id: string) {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }
}