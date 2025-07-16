import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoAfiliadoAmazon } from '../../model/produto-afiliado-amazon.model';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {
  constructor(private http: HttpClient) {}

  buscarProdutos(palavra: string): Observable<ProdutoAfiliadoAmazon[]> {
    const url = `/api/amazon?palavra=${encodeURIComponent(palavra)}`;
    return this.http.get<ProdutoAfiliadoAmazon[]>(url);
  }
}
