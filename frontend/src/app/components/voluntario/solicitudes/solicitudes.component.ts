import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../../services/solicitud.service';
import { OfertaService } from '../../../services/oferta.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  solicitudes: any[] = [];
  filteredSolicitudes: any[] = [];
  selectedCategory: string = 'Todos';
  ofertasEnviadas: Set<number> = new Set();

  constructor(
    private solicitudService: SolicitudService,
    private ofertaService: OfertaService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadSolicitudes();
    this.loadMisOfertas();
  }

  loadSolicitudes() {
    this.solicitudService.getAbiertas().subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.filteredSolicitudes = data;
      },
      error: (err) => console.error('Error loading solicitudes', err)
    });
  }

  loadMisOfertas() {
    this.ofertaService.getMisOfertas().subscribe({
      next: (ofertas) => {
        ofertas.forEach(oferta => this.ofertasEnviadas.add(oferta.id_solicitud));
      },
      error: (err) => console.error('Error loading mis ofertas', err)
    });
  }

  filter() {
    if (this.selectedCategory === 'Todos') {
      this.filteredSolicitudes = this.solicitudes;
    } else {
      this.filteredSolicitudes = this.solicitudes.filter(s => 
        s.categoria === this.selectedCategory
      );
    }
  }

  ofrecerAyuda(id_solicitud: number) {
    if (confirm('¿Estás seguro que deseas ofrecer ayuda a esta solicitud?')) {
      this.ofertaService.crearOferta(id_solicitud).subscribe({
        next: () => {
          this.toastService.showSuccess('¡Oferta enviada con éxito!');
          this.ofertasEnviadas.add(id_solicitud);
          this.loadSolicitudes(); // Reload UI automatically!
        },
        error: (err) => {
          this.toastService.showError(err.error?.message || 'Error al enviar la oferta');
        }
      });
    }
  }
}
