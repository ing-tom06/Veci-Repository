import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisSolicitudesComponent } from './mis-solicitudes.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MisSolicitudesComponent (Adulto Mayor)', () => {
  let component: MisSolicitudesComponent;
  let fixture: ComponentFixture<MisSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MisSolicitudesComponent,
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

    fixture = TestBed.createComponent(MisSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('2. La lista de solicitudes debe iniciar vacía', () => {
    expect(component.solicitudes.length).toBe(0);
  });

  it('3. El chat debe iniciar cerrado', () => {
    expect(component.chatOpen).toBeFalse();
    expect(component.chatSolicitudId).toBeNull();
  });

  it('4. abrirChat() debe abrir el chat con el id correcto', () => {
    component.abrirChat(42);
    expect(component.chatOpen).toBeTrue();
    expect(component.chatSolicitudId).toBe(42);
  });

  it('5. cerrarChat() debe cerrar el chat y limpiar el id', () => {
    component.chatOpen = true;
    component.chatSolicitudId = 42;
    component.cerrarChat();
    expect(component.chatOpen).toBeFalse();
    expect(component.chatSolicitudId).toBeNull();
  });

  it('6. verOfertas() debe cerrar un panel de ofertas que ya estaba abierto (toggle)', () => {
    component.mostrarOfertas[10] = true;
    component.ofertasPorSolicitud[10] = [{ id_oferta: 1 }]; // simular datos cargados
    component.verOfertas(10);
    expect(component.mostrarOfertas[10]).toBeFalse();
  });

  it('7. ofertasPorSolicitud debe iniciar como objeto vacío', () => {
    expect(Object.keys(component.ofertasPorSolicitud).length).toBe(0);
  });
});
