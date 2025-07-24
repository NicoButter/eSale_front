import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string; // si el backend devuelve un token JWT
  user: any; // tiparlo mejor si hace falta
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
  const loginData = { email, password };
  return this.http.post<LoginResponseDTO>(this.authUrl, loginData).pipe(
    tap(response => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('rol', response.user.rol);
    })
  );
}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('rol');
  }

  isCliente(): boolean {
    return this.getUserRole() === 'cliente';
  }

}

