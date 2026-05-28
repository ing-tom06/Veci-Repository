import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private apiUrl = environment.apiUrl + '/calificaciones';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  createCalificacion(id_solicitud: number, puntaje: number, comentario: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { id_solicitud, puntaje, comentario }, { headers: this.getHeaders() });
  }

  getMisCalificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/me`, { headers: this.getHeaders() });
  }

  checkRatingStatus(id_solicitud: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/check/${id_solicitud}`, { headers: this.getHeaders() });
  }
}
