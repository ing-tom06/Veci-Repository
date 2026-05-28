import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalificacionService } from '../../../services/calificacion.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-calificar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.css']
})
export class CalificarComponent {
  @Input() idSolicitud: number | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSaved = new EventEmitter<void>();

  puntaje: number = 0;
  hoverPuntaje: number = 0;
  comentario: string = '';
  submitting: boolean = false;

  constructor(
    private calificacionService: CalificacionService,
    private toastService: ToastService
  ) {}

  selectStars(stars: number): void {
    this.puntaje = stars;
  }

  hoverStars(stars: number): void {
    this.hoverPuntaje = stars;
  }

  clearHover(): void {
    this.hoverPuntaje = 0;
  }

  submitRating(): void {
    if (!this.idSolicitud) return;
    if (this.puntaje === 0) {
      this.toastService.showError('Por favor selecciona una puntuación antes de enviar.');
      return;
    }

    this.submitting = true;
    this.calificacionService.createCalificacion(this.idSolicitud, this.puntaje, this.comentario).subscribe({
      next: () => {
        this.toastService.showSuccess('¡Muchas gracias! Tu opinión nos ayuda a crecer.');
        this.submitting = false;
        this.reset();
        this.onSaved.emit();
      },
      error: (err) => {
        console.error(err);
        this.toastService.showError(err.error?.message || 'Error al enviar la calificación');
        this.submitting = false;
      }
    });
  }

  closeModal(): void {
    this.reset();
    this.onClose.emit();
  }

  private reset(): void {
    this.puntaje = 0;
    this.hoverPuntaje = 0;
    this.comentario = '';
  }
}
