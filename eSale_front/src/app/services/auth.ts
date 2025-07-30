import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/usuarios/login';

  private nombreSubject = new BehaviorSubject<string | null>(localStorage.getItem('nombre'));
  nombre$ = this.nombreSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(r: { email: string; password: string }): Observable<any> {
    return this.http.post(this.authUrl, r).pipe(
      tap((i: any) => {
        if (!i?.rol) {
          console.error("Login sin rol, respuesta inválida:", i);
          return;
        }

        localStorage.setItem("rol", i.rol);
        localStorage.setItem("usuario", i.email);
        localStorage.setItem("nombre", i.nombre);
        this.nombreSubject.next(i.nombre); // 👈 importante

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

  logout(): void {
    localStorage.clear();
    this.nombreSubject.next(null);

    fetch('http://localhost:8080/usuarios/logout', {
      method: 'POST',
      credentials: 'include'
    }).finally(() => {
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('rol');
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
