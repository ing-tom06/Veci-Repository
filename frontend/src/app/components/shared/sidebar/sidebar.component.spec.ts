import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
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

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('2. El menú mobile debe iniciar cerrado', () => {
    expect(component.isMobileMenuOpen).toBeFalse();
  });

  it('3. toggleMobileMenu() debe abrir el menú si está cerrado', () => {
    component.isMobileMenuOpen = false;
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBeTrue();
  });

  it('4. toggleMobileMenu() debe cerrar el menú si está abierto', () => {
    component.isMobileMenuOpen = true;
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBeFalse();
  });

  it('5. La propiedad user debe iniciar como null', () => {
    expect(component.user).toBeNull();
  });

  it('6. La propiedad links debe iniciar como arreglo vacío', () => {
    expect(component.links).toEqual([]);
  });

  it('7. Debe aceptar datos de usuario via @Input', () => {
    const mockUser = { nombre: 'María', rol: 'voluntario', correo: 'maria@test.com' };
    component.user = mockUser;
    fixture.detectChanges();
    expect(component.user.nombre).toBe('María');
    expect(component.user.rol).toBe('voluntario');
  });
});
