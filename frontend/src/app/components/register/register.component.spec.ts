import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('2. El formulario debe iniciar inválido (campos vacíos)', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('3. Debe tener los dos roles disponibles (voluntario y adulto mayor)', () => {
    const roles = component.roles.map(r => r.value);
    expect(roles).toContain('voluntario');
    expect(roles).toContain('adulto mayor');
  });

  it('4. El campo correo debe validar formato de email', () => {
    const correoControl = component.registerForm.get('correo');
    correoControl?.setValue('correo-invalido');
    expect(correoControl?.hasError('email')).toBeTrue();
  });

  it('5. La contraseña debe tener mínimo 8 caracteres', () => {
    const contrasenaControl = component.registerForm.get('contrasena');
    contrasenaControl?.setValue('corta');
    expect(contrasenaControl?.hasError('minlength')).toBeTrue();
  });

  it('6. Al seleccionar rol voluntario, la edad debe estar entre 18 y 50', () => {
    component.registerForm.get('rol')?.setValue('voluntario');
    const edadControl = component.registerForm.get('edad');

    edadControl?.setValue(17);
    expect(edadControl?.hasError('min')).toBeTrue();

    edadControl?.setValue(51);
    expect(edadControl?.hasError('max')).toBeTrue();

    edadControl?.setValue(25);
    expect(edadControl?.valid).toBeTrue();
  });

  it('7. Al seleccionar rol adulto mayor, la edad debe estar entre 60 y 90', () => {
    component.registerForm.get('rol')?.setValue('adulto mayor');
    const edadControl = component.registerForm.get('edad');

    edadControl?.setValue(59);
    expect(edadControl?.hasError('min')).toBeTrue();

    edadControl?.setValue(91);
    expect(edadControl?.hasError('max')).toBeTrue();

    edadControl?.setValue(70);
    expect(edadControl?.valid).toBeTrue();
  });

  it('8. selectedFile debe iniciar como null', () => {
    expect(component.selectedFile).toBeNull();
  });

  it('9. El mensaje de error debe iniciar vacío', () => {
    expect(component.errorMessage).toBe('');
  });
});
