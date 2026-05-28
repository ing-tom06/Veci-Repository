import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = environment.apiUrl + '/solicitudes';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getAbiertas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/abiertas`, { headers: this.getHeaders() });
  }

  getMisSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-solicitudes`, { headers: this.getHeaders() });
  }

  getHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/historial`, { headers: this.getHeaders() });
  }

  crearSolicitud(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  completarSolicitud(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/complete`, {}, { headers: this.getHeaders() });
  }
}
