import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private readonly apiUrl = `${environment.apiUrl}/university`;

  constructor(private http: HttpClient) { }

  listarCursos() {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }

  obterCurso(id: string) {
    return this.http.get<any>(`${this.apiUrl}/courses/${id}`);
  }

  comprarCurso(id: string) {
    return this.http.post(`${this.apiUrl}/courses/${id}/purchase`, {});
  }

  salvarProgresso(id: string, moduloAtual: number, percentual: number) {
    return this.http.put(`${this.apiUrl}/courses/${id}/progress`, { moduloAtual, percentual });
  }
}
