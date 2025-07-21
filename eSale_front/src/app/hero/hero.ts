import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ApiService, ProductoDestacado } from '../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class Hero implements OnInit {

  featuredProducts: ProductoDestacado[] = [];

  // offers: Product[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getArticulosDestacados().subscribe({
      next: (products) => {
        this.featuredProducts = products;
        console.log(this.featuredProducts); // para verificar la estructura
      },
      error: (error) => console.error('Error al cargar productos destacados:', error)
    });
  }
}