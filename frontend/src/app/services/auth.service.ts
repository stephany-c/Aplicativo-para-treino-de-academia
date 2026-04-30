import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  
  // Sinal para o estado de login (UI)
  isLoggedIn = signal<boolean>(this.hasToken());
  
  // Fluxo reativo para o ID do usuário (Dados)
  private usuarioIdSubject = new BehaviorSubject<number | null>(this.getUsuarioIdFromStorage());
  usuarioId$ = this.usuarioIdSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; senha: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuarioId', String(response.usuarioId));
          this.isLoggedIn.set(true);
          this.usuarioIdSubject.next(response.usuarioId);
        }
      })
    );
  }

  cadastrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, usuario);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    this.isLoggedIn.set(false);
    this.usuarioIdSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuarioId(): number | null {
    return this.usuarioIdSubject.value;
  }

  private getUsuarioIdFromStorage(): number | null {
    const id = localStorage.getItem('usuarioId');
    return id ? Number(id) : null;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
