import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilComponent } from './editar-perfil.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditarPerfilComponent', () => {
  let component: EditarPerfilComponent;
  let fixture: ComponentFixture<EditarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser un componente Standalone, lo incluimos en imports
      imports: [
        EditarPerfilComponent, 
        MatSnackBarModule,
        NoopAnimationsModule // Evita errores de animaciones durante las pruebas
      ],
      providers: [
        // Proveemos HttpClient y Router para resolver el NullInjectorError
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente correctamente (Prueba de Inyección)', () => {
    expect(component).toBeTruthy();
  });
});
