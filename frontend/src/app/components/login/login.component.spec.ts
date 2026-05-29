import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('2. El formulario debe iniciar inválido (campos vacíos)', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('3. El campo correo debe ser requerido', () => {
    const correoControl = component.loginForm.get('correo');
    correoControl?.setValue('');
    expect(correoControl?.hasError('required')).toBeTrue();
  });

  it('4. El campo correo debe validar formato de email', () => {
    const correoControl = component.loginForm.get('correo');
    correoControl?.setValue('no-es-un-email');
    expect(correoControl?.hasError('email')).toBeTrue();
  });

  it('5. El campo contrasena debe ser requerido', () => {
    const contrasenaControl = component.loginForm.get('contrasena');
    contrasenaControl?.setValue('');
    expect(contrasenaControl?.hasError('required')).toBeTrue();
  });

  it('6. El formulario debe ser válido con datos correctos', () => {
    component.loginForm.setValue({
      correo: 'usuario@test.com',
      contrasena: 'password123'
    });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('7. El mensaje de error debe iniciar vacío', () => {
    expect(component.errorMessage).toBe('');
  });
});
