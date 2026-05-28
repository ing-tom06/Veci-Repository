import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-nueva-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nueva-solicitud.component.html',
  styleUrls: ['./nueva-solicitud.component.css']
})
export class NuevaSolicitudComponent implements OnInit {
  solicitudForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      categoria: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      direccion: ['', Validators.required],
      fecha_servicio: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.solicitudForm.valid) {
      this.solicitudService.crearSolicitud(this.solicitudForm.value).subscribe({
        next: () => {
          this.toastService.showSuccess('Solicitud publicada con éxito');
          this.router.navigate(['/adulto-mayor/mis-solicitudes']);
        },
        error: (err) => {
          this.toastService.showError(err.error?.message || 'Error al publicar la solicitud');
        }
      });
    }
  }
}
