import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = environment.apiUrl + '/notificaciones';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  marcarLeida(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/read`, {}, { headers: this.getHeaders() });
  }
}
