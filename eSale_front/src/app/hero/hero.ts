import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ApiService, ProductoDestacado } from '../services/api';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class Hero implements OnInit {
  featuredProducts: ProductoDestacado[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.apiService.getArticulosDestacados().subscribe({
      next: (products) => (this.featuredProducts = products),
      error: (err) => console.error(err)
    });
  }

  mostrarBoton(): boolean {
    return this.authService.isLoggedIn() && this.authService.isCliente();
  }
}