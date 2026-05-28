import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl + '/chat';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getConversations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conversations`, { headers: this.getHeaders() });
  }

  getMessages(id_solicitud: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages/${id_solicitud}`, { headers: this.getHeaders() });
  }

  sendMessage(id_solicitud: number, contenido: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/messages`, { id_solicitud, contenido }, { headers: this.getHeaders() });
  }
}
