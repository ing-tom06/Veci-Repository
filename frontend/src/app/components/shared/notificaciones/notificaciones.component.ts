import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  notificaciones: any[] = [];
  isOpen = false;
  private intervalId: any;

  get noLeidas(): number {
    return this.notificaciones.filter(n => !n.leida).length;
  }

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.cargarNotificaciones();
    // Polling cada 30 segundos para nuevas notificaciones
    this.intervalId = setInterval(() => this.cargarNotificaciones(), 30000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  cargarNotificaciones(): void {
    this.notificacionService.getNotificaciones().subscribe({
      next: (data) => this.notificaciones = data,
      error: (err) => console.error('Error al cargar notificaciones', err)
    });
  }

  togglePanel(): void {
    this.isOpen = !this.isOpen;
  }

  marcarLeida(notif: any, event: Event): void {
    event.stopPropagation();
    if (notif.leida) return;
    this.notificacionService.marcarLeida(notif.id_notificacion).subscribe({
      next: () => notif.leida = true,
      error: (err) => console.error('Error al marcar notificación', err)
    });
  }

  marcarTodasLeidas(): void {
    const noLeidas = this.notificaciones.filter(n => !n.leida);
    noLeidas.forEach(n => {
      this.notificacionService.marcarLeida(n.id_notificacion).subscribe({
        next: () => n.leida = true
      });
    });
  }

  // Cerrar el panel al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notif-wrapper')) {
      this.isOpen = false;
    }
  }
}
