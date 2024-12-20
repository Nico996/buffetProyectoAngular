import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuDTO {
  idmenu: number;  // El ID del menú
  precio: number;  // El precio total del menú
  tipo: string;    // El nombre o tipo del menú
  comidas: number[];  // Lista de IDs de comidas (números que representan las comidas)
  dias: Dias;      // El día seleccionado (de la enumeración LUNES, MARTES, etc.)
}

// Enum que representa los días de la semana
export enum Dias {
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIERCOLES = 'MIERCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES'
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private apiUrl = 'http://localhost:8080/menu'; // URL del backend

  constructor(private http: HttpClient) {}

  crearMenu(menu: any): Observable<any> {
    return this.http.post<MenuDTO>(this.apiUrl, menu);
  }
}
