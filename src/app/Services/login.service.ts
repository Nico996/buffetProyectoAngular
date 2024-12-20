import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/usuario/Autenticacion';

  constructor(private http: HttpClient) {}

  postAutenticacion(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(this.apiUrl, data, httpOptions).pipe(
      tap((response: any) => {
        // Guardar el token en localStorage o sessionStorage
        localStorage.setItem('token', response.token);
      })
    );
  }
}