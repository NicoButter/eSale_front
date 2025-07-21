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
  rebaja?: { porcentajeDescuento?: number };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/articulos';

  constructor(private http: HttpClient) {}

  getArticulosDestacados(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/destacados`);
}

  // getProductsWithOffers(): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiUrl}/offers`);
  // }
}