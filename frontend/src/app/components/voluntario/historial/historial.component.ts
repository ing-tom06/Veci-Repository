import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaService } from '../../../services/oferta.service';
import { CalificacionService } from '../../../services/calificacion.service';
import { CalificarComponent } from '../../shared/calificar/calificar.component';

@Component({
  selector: 'app-historial-voluntario',
  standalone: true,
  imports: [CommonModule, CalificarComponent],
  templateUrl: './historial.component.html',
  styleUrls: ['../solicitudes/solicitudes.component.css'] // reuse css
})
export class HistorialComponent implements OnInit {
  calificarOpen = false;
  calificarSolicitudId: number | null = null;
  historial: any[] = [];

  constructor(
    private ofertaService: OfertaService,
    private calificacionService: CalificacionService
  ) {}

  ngOnInit(): void {
    this.ofertaService.getHistorial().subscribe({
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
