import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/usuarios/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(r: any): Observable<any> {
    return this.http.post(this.authUrl, r).pipe(
      tap((i: any) => {
        if (!i?.rol) {
          console.error("Login sin rol, respuesta inválida:", i);
          return;
        }

        localStorage.setItem("rol", i.rol);
        localStorage.setItem("usuario", i.email);
        localStorage.setItem("nombre", i.nombre);

        if (i.rol === 'ADMIN') {
          this.router.navigate(['/dashboard-admin']);
        } else if (i.rol === 'CLIENTE') {
          this.router.navigate(['/dashboard-cliente']);
        } else {
          console.warn("Rol desconocido:", i.rol);
        }
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

  register(userData: any): Observable<any> {
    return this.http.post('http://localhost:8080/usuarios/register', userData);
  }

}

