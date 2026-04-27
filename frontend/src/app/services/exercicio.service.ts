import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercicio } from '../models/exercicio';

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {
  private apiUrl = 'http://localhost:8080/exercicios';

  constructor(private http: HttpClient) { }

  listarPorTreino(treinoId: number): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${this.apiUrl}/treino/${treinoId}`);
  }

  criar(exercicio: Exercicio): Observable<Exercicio> {
    return this.http.post<Exercicio>(this.apiUrl, exercicio);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
