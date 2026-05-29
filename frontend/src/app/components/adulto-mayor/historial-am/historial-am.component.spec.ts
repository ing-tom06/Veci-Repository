import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialAmComponent } from './historial-am.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HistorialAmComponent', () => {
  let component: HistorialAmComponent;
  let fixture: ComponentFixture<HistorialAmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HistorialAmComponent,
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
    
    fixture = TestBed.createComponent(HistorialAmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente correctamente (Prueba de Inyección)', () => {
    expect(component).toBeTruthy();
  });
});
