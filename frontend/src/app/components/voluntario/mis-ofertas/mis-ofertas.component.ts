import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaService } from '../../../services/oferta.service';
import { ChatComponent } from '../../shared/chat/chat.component';

@Component({
  selector: 'app-mis-ofertas',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './mis-ofertas.component.html',
  styleUrls: ['../solicitudes/solicitudes.component.css'] // reuse css
})
export class MisOfertasComponent implements OnInit {
  chatOpen = false;
  chatSolicitudId: number | null = null;
  ofertas: any[] = [];

  constructor(private ofertaService: OfertaService) {}

  ngOnInit(): void {
    this.ofertaService.getMisOfertas().subscribe({
      next: (data) => this.ofertas = data,
      error: (err) => console.error('Error loading ofertas', err)
    });
  }

  abrirChat(id_solicitud: number) {
    this.chatSolicitudId = id_solicitud;
    this.chatOpen = true;
  }

  cerrarChat() {
    this.chatOpen = false;
    this.chatSolicitudId = null;
  }
}
