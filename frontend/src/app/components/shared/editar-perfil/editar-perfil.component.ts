import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PerfilService } from '../../../services/perfil.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  perfilForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  loading: boolean = true;
  submitting: boolean = false;
  promedioCalificaciones: number | null = null;

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService,
    private toastService: ToastService
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [''],
      telefono: [''],
      documento_identidad: [''],
      correo: [{value: '', disabled: true}],
      rol: [{value: '', disabled: true}]
    });
  }

  ngOnInit(): void {
    this.loadPerfil();
  }

  loadPerfil() {
    this.perfilService.getPerfil().subscribe({
      next: (data) => {
        this.perfilForm.patchValue({
          nombre: data.nombre,
          apellido: data.apellido,
          edad: data.edad,
          telefono: data.telefono,
          documento_identidad: data.documento_identidad,
          correo: data.correo,
          rol: data.rol
        });
        if (data.foto_perfil) {
          this.imagePreview = data.foto_perfil;
        }
        this.promedioCalificaciones = data.promedio_calificaciones;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastService.showError('Error al cargar perfil');
        this.loading = false;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.perfilForm.invalid) return;

    this.submitting = true;
    const formData = new FormData();
    formData.append('nombre', this.perfilForm.get('nombre')?.value);
    formData.append('apellido', this.perfilForm.get('apellido')?.value);
    
    const edad = this.perfilForm.get('edad')?.value;
    if (edad) formData.append('edad', edad);
    
    const telefono = this.perfilForm.get('telefono')?.value;
    if (telefono) formData.append('telefono', telefono);
    
    const documento = this.perfilForm.get('documento_identidad')?.value;
    if (documento) formData.append('documento_identidad', documento);

    if (this.selectedFile) {
      formData.append('foto_perfil', this.selectedFile);
    }

    this.perfilService.updatePerfil(formData).subscribe({
      next: (res) => {
        this.toastService.showSuccess('Perfil actualizado con éxito');
        this.submitting = false;
        
        const tokenUser = sessionStorage.getItem('user');
        if (tokenUser) {
          let user = JSON.parse(tokenUser);
          user.nombre = this.perfilForm.get('nombre')?.value;
          if (res.foto_perfil) {
            user.foto = res.foto_perfil;
          }
          sessionStorage.setItem('user', JSON.stringify(user));
          
          window.dispatchEvent(new Event('storage')); 
        }
      },
      error: (err) => {
        console.error(err);
        this.toastService.showError('Error al actualizar perfil');
        this.submitting = false;
      }
    });
  }
}
