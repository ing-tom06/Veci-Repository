import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaSolicitudComponent } from './nueva-solicitud.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NuevaSolicitudComponent', () => {
  let component: NuevaSolicitudComponent;
  let fixture: ComponentFixture<NuevaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NuevaSolicitudComponent,
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

    fixture = TestBed.createComponent(NuevaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('2. El formulario debe iniciar inválido (campos vacíos)', () => {
    expect(component.solicitudForm.valid).toBeFalse();
  });

  it('3. El campo categoria debe ser requerido', () => {
    const control = component.solicitudForm.get('categoria');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('4. El campo descripcion debe ser requerido', () => {
    const control = component.solicitudForm.get('descripcion');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('5. El campo descripcion no debe superar 500 caracteres', () => {
    const control = component.solicitudForm.get('descripcion');
    control?.setValue('a'.repeat(501));
    expect(control?.hasError('maxlength')).toBeTrue();
  });

  it('6. El campo direccion debe ser requerido', () => {
    const control = component.solicitudForm.get('direccion');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('7. El campo fecha_servicio debe ser requerido', () => {
    const control = component.solicitudForm.get('fecha_servicio');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('8. El formulario debe ser válido con todos los campos correctos', () => {
    component.solicitudForm.setValue({
      categoria: 'Compras',
      descripcion: 'Necesito ayuda con el mercado',
      direccion: 'Calle 10 #5-20',
      fecha_servicio: '2025-06-15'
    });
    expect(component.solicitudForm.valid).toBeTrue();
  });
});
