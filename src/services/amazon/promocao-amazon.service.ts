import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoAfiliadoAmazon } from '../../model/produto-afiliado-amazon.model';

@Injectable({ providedIn: 'root' })
export class PromocaoAmazonService {
  private readonly endpoint = '/api/amazon/promocoes';

  constructor(private http: HttpClient) { }

  listarPromocoes(): Observable<ProdutoAfiliadoAmazon[]> {
    return this.http.get<ProdutoAfiliadoAmazon[]>(this.endpoint);
  }
}
