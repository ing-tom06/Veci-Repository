import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudesComponent } from './solicitudes.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SolicitudesComponent (Voluntario)', () => {
  let component: SolicitudesComponent;
  let fixture: ComponentFixture<SolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SolicitudesComponent,
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

    fixture = TestBed.createComponent(SolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('2. Las listas deben iniciar vacías', () => {
    expect(component.solicitudes.length).toBe(0);
    expect(component.filteredSolicitudes.length).toBe(0);
  });

  it('3. La categoría seleccionada debe iniciar en "Todos"', () => {
    expect(component.selectedCategory).toBe('Todos');
  });

  it('4. ofertasEnviadas debe iniciar como un Set vacío', () => {
    expect(component.ofertasEnviadas.size).toBe(0);
  });

  it('5. filter() con "Todos" debe mostrar todas las solicitudes', () => {
    component.solicitudes = [
      { id_solicitud: 1, categoria: 'Compras' },
      { id_solicitud: 2, categoria: 'Médico' }
    ];
    component.selectedCategory = 'Todos';
    component.filter();
    expect(component.filteredSolicitudes.length).toBe(2);
  });

  it('6. filter() con una categoría específica debe filtrar correctamente', () => {
    component.solicitudes = [
      { id_solicitud: 1, categoria: 'Compras' },
      { id_solicitud: 2, categoria: 'Médico' },
      { id_solicitud: 3, categoria: 'Compras' }
    ];
    component.selectedCategory = 'Compras';
    component.filter();
    expect(component.filteredSolicitudes.length).toBe(2);
    expect(component.filteredSolicitudes.every(s => s.categoria === 'Compras')).toBeTrue();
  });

  it('7. filter() con categoría sin resultados debe retornar lista vacía', () => {
    component.solicitudes = [
      { id_solicitud: 1, categoria: 'Compras' }
    ];
    component.selectedCategory = 'Médico';
    component.filter();
    expect(component.filteredSolicitudes.length).toBe(0);
  });
});
