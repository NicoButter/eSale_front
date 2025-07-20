import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Marca {
  id: number;
  nombre: string;
}

export interface Product {
  id: number;
  codigo: string;
  marca: Marca;
  modelo: string;
  precioSinIVA: number;
  descripcion: string;
  stock: number;
  imageUrl?: string;
  rebaja?: { porcentajeDescuento?: number }; // Ajustado para reflejar Rebaja
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/articulos';

  constructor(private http: HttpClient) {}

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured`);
  }

  getProductsWithOffers(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/offers`);
  }
}