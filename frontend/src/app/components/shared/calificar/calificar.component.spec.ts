import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalificarComponent } from './calificar.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CalificarComponent', () => {
  let component: CalificarComponent;
  let fixture: ComponentFixture<CalificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalificarComponent,
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
    
    fixture = TestBed.createComponent(CalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente correctamente (Prueba de Inyección)', () => {
    expect(component).toBeTruthy();
  });
});
