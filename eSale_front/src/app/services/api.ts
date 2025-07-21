import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Marca {
  id: number;
  nombre: string;
}

export interface Articulo {
  id: number;
  codigo: string;
  modelo: string;
  precioSinIVA: number;
  descripcion: string;
  stock: number;
  imageUrl?: string;
  marcaNombre?: string;
  marca?: Marca;
}

export interface ProductoDestacado {
  id: number; // id del destacado
  articulo: Articulo;
  fechaInicio: string;
  fechaFin: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/articulos';

  constructor(private http: HttpClient) { }

  getArticulosDestacados(): Observable<ProductoDestacado[]> {
    return this.http.get<ProductoDestacado[]>(`${this.apiUrl}/destacados`);
  }

  // getProductsWithOffers(): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiUrl}/offers`);
  // }
  
}