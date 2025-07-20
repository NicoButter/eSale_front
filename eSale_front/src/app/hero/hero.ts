import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ApiService, Product } from '../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class Hero implements OnInit { // Confirmar que es 'Hero', no 'HeroComponent'
  featuredProducts: Product[] = [];
  offers: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products;
      },
      error: (error) => console.error('Error al cargar productos destacados:', error)
    });

    this.apiService.getProductsWithOffers().subscribe({
      next: (products) => {
        this.offers = products;
      },
      error: (error) => console.error('Error al cargar ofertas:', error)
    });
  }

  getDiscountedPrice(product: Product): number {
    return product.rebaja?.porcentajeDescuento
      ? product.precioSinIVA * (1 - product.rebaja.porcentajeDescuento / 100)
      : product.precioSinIVA;
  }
}