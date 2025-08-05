import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

export interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  pais: string;
}

export interface CriarUsuarioDto {
  nomeCompleto: string;
  email: string;
  senha: string;
  cpf: string;
  telefone?: string;
  endereco: Endereco;
  role: 'aluno' | 'adm';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  registrar(dto: CriarUsuarioDto) {
    return this.http.post(this.apiUrl, dto);
  }

  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
