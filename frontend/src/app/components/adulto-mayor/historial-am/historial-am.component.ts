import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../../services/solicitud.service';
import { CalificacionService } from '../../../services/calificacion.service';
import { CalificarComponent } from '../../shared/calificar/calificar.component';

@Component({
  selector: 'app-historial-am',
  standalone: true,
  imports: [CommonModule, CalificarComponent],
  templateUrl: './historial-am.component.html',
  styleUrls: ['../../voluntario/solicitudes/solicitudes.component.css'] // reuse existing styles
})
export class HistorialAmComponent implements OnInit {
  calificarOpen = false;
  calificarSolicitudId: number | null = null;
  historial: any[] = [];

  constructor(
    private solicitudService: SolicitudService,
    private calificacionService: CalificacionService
  ) {}

  ngOnInit(): void {
    this.solicitudService.getHistorial().subscribe({
      next: (data) => {
        this.historial = data;
        // Check rating status for each completed interaction
        this.historial.forEach((item) => {
          if ((item.estado || '').toLowerCase() === 'completada') {
            this.calificacionService.checkRatingStatus(item.id_solicitud).subscribe({
              next: (res) => {
                item.canRate = res.eligible;
              },
              error: (err) => {
                console.error('Error checking rating status', err);
                item.canRate = false;
              }
            });
          } else {
            item.canRate = false;
          }
        });
      },
      error: (err) => console.error('Error loading historial', err)
    });
  }

  abrirCalificar(id_solicitud: number) {
    this.calificarSolicitudId = id_solicitud;
    this.calificarOpen = true;
  }

  cerrarCalificar() {
    this.calificarOpen = false;
    this.calificarSolicitudId = null;
  }

  calificacionGuardada() {
    this.cerrarCalificar();
    this.ngOnInit();
  }
}
