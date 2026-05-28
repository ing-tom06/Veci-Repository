import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service';
import { OfertaService } from '../../../services/oferta.service';
import { ToastService } from '../../../services/toast.service';
import { ChatComponent } from '../../shared/chat/chat.component';

@Component({
  selector: 'app-mis-solicitudes',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatComponent],
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['../../voluntario/solicitudes/solicitudes.component.css'] // reuse existing styles
})
export class MisSolicitudesComponent implements OnInit {
  solicitudes: any[] = [];
  ofertasPorSolicitud: Record<number, any[]> = {};
  mostrarOfertas: Record<number, boolean> = {};
  
  chatOpen = false;
  chatSolicitudId: number | null = null;

  constructor(
    private solicitudService: SolicitudService,
    private ofertaService: OfertaService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.solicitudService.getMisSolicitudes().subscribe({
      next: (data) => this.solicitudes = data,
      error: (err) => {
        console.error('Error loading solicitudes', err);
        this.toastService.showError('Error al cargar las solicitudes');
      }
    });
  }

  verOfertas(id_solicitud: number) {
    // If it's already open, just close it
    if (this.mostrarOfertas[id_solicitud]) {
      this.mostrarOfertas[id_solicitud] = false;
      return;
    }

    // Close all other open offer panels (Accordion effect)
    Object.keys(this.mostrarOfertas).forEach(key => {
      this.mostrarOfertas[Number(key)] = false;
    });

    // Fetch if not already fetched
    if (!this.ofertasPorSolicitud[id_solicitud]) {
      this.ofertaService.getOfertasBySolicitud(id_solicitud).subscribe({
        next: (ofertas) => {
          this.ofertasPorSolicitud[id_solicitud] = ofertas;
          this.mostrarOfertas[id_solicitud] = true;
        },
        error: (err) => {
          console.error(err);
          this.toastService.showError('Error al cargar las ofertas');
        }
      });
    } else {
      // Just open it
      this.mostrarOfertas[id_solicitud] = true;
    }
  }

  aceptarOferta(id_oferta: number, id_solicitud: number) {
    if (confirm('¿Estás seguro que deseas aceptar esta oferta? Las demás serán rechazadas.')) {
      this.ofertaService.aceptarOferta(id_oferta, id_solicitud).subscribe({
        next: () => {
          this.toastService.showSuccess('Oferta aceptada con éxito');
          this.ngOnInit(); // Reload all requests to reflect ASIGNADA state
          this.mostrarOfertas[id_solicitud] = false; // Close the offers dropdown
          delete this.ofertasPorSolicitud[id_solicitud]; // Clear cached offers
        },
        error: (err) => {
          console.error(err);
          this.toastService.showError('Error al aceptar la oferta');
        }
      });
    }
  }

  rechazarOferta(id_oferta: number, id_solicitud: number) {
    if (confirm('¿Estás seguro que deseas rechazar esta oferta?')) {
      this.ofertaService.rechazarOferta(id_oferta).subscribe({
        next: () => {
          this.toastService.showSuccess('Oferta rechazada');
          // Reload only the offers for this request to show the updated status
          this.ofertaService.getOfertasBySolicitud(id_solicitud).subscribe({
            next: (ofertas) => this.ofertasPorSolicitud[id_solicitud] = ofertas
          });
        },
        error: (err) => {
          console.error(err);
          this.toastService.showError('Error al rechazar la oferta');
        }
      });
    }
  }

  finalizarSolicitud(id_solicitud: number) {
    if (confirm('¿Deseas marcar esta solicitud como FINALIZADA? Pasará a tu historial.')) {
      this.solicitudService.completarSolicitud(id_solicitud).subscribe({
        next: () => {
          this.toastService.showSuccess('Solicitud completada con éxito');
          this.cerrarChat();
          this.ngOnInit();
        },
        error: (err) => {
          console.error(err);
          this.toastService.showError('Error al finalizar la solicitud');
        }
      });
    }
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
