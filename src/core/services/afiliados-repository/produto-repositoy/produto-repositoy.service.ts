import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { Produto } from '../../../../model/produto/produto';
import { FiltroProduto } from '../../../../model/filtro-produto/filtro-produto';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  private readonly apiUrl = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) { }

  async listar(filtros: FiltroProduto) {
    let params = new HttpParams();

    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<Produto[]>(this.apiUrl, { params });
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