import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ComidaDTO {
  id: number;
  nombre: string;
  precio: number;
}
@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  private apiUrl = 'http://localhost:8080/comida';  

  constructor(private http: HttpClient) { }

  crearComida(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(this.apiUrl, data, httpOptions);
  }
  obtenerComidas():Observable<any>{
    return this.http.get<ComidaDTO[]>(this.apiUrl);
  }

}
