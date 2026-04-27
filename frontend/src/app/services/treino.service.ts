import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Treino } from '../models/treino';

@Injectable({
  providedIn: 'root'
})
export class TreinoService {
  private apiUrl = 'http://localhost:8080/treino';

  constructor(private http: HttpClient) { }

  listar(): Observable<Treino[]> {
    return this.http.get<Treino[]>(this.apiUrl);
  }

  listarPorUsuario(usuarioId: number): Observable<Treino[]> {
    return this.http.get<Treino[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  buscarPorId(id: number): Observable<Treino> {
    return this.http.get<Treino>(`${this.apiUrl}/${id}`);
  }

  criar(treino: Treino): Observable<Treino> {
    return this.http.post<Treino>(this.apiUrl, treino);
  }

  atualizar(id: number, treino: Treino): Observable<Treino> {
    return this.http.put<Treino>(`${this.apiUrl}/${id}`, treino);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
