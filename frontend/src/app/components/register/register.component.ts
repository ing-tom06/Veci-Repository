import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;

  roles = [
    { value: 'voluntario', viewValue: 'Voluntario' },
    { value: 'adulto mayor', viewValue: 'Adulto Mayor' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      documento_identidad: ['', Validators.required],
      telefono: ['', Validators.required],
      edad: ['', [Validators.required]],
      rol: ['', Validators.required]
    });

    this.registerForm.get('rol')?.valueChanges.subscribe(role => {
      const edadControl = this.registerForm.get('edad');
      if (role === 'voluntario') {
        edadControl?.setValidators([Validators.required, Validators.min(18), Validators.max(50)]);
      } else if (role === 'adulto mayor') {
        edadControl?.setValidators([Validators.required, Validators.min(60), Validators.max(90)]);
      } else {
        edadControl?.setValidators([Validators.required]);
      }
      edadControl?.updateValueAndValidity();
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Preview
      const reader = new FileReader();
      reader.onload = e => this.filePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(this.registerForm.controls).forEach(key => {
        formData.append(key, this.registerForm.get(key)?.value);
      });

      // Append file if selected
      if (this.selectedFile) {
        formData.append('foto_perfil', this.selectedFile);
      }

      this.authService.register(formData).subscribe({
        next: (res) => {
          alert('Registro exitoso! Por favor inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al registrar usuario';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
