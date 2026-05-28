import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  private apiUrl = environment.apiUrl + '/ofertas';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getMisOfertas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-ofertas`, { headers: this.getHeaders() });
  }

  getHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/historial`, { headers: this.getHeaders() });
  }

  getOfertasBySolicitud(id_solicitud: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/solicitud/${id_solicitud}`, { headers: this.getHeaders() });
  }

  crearOferta(id_solicitud: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { id_solicitud }, { headers: this.getHeaders() });
  }

  aceptarOferta(id_oferta: number, id_solicitud: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id_oferta}/accept`, { id_solicitud }, { headers: this.getHeaders() });
  }

  rechazarOferta(id_oferta: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id_oferta}/reject`, {}, { headers: this.getHeaders() });
  }
}
