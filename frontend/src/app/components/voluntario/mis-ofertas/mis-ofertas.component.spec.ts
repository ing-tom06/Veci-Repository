import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisOfertasComponent } from './mis-ofertas.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MisOfertasComponent', () => {
  let component: MisOfertasComponent;
  let fixture: ComponentFixture<MisOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MisOfertasComponent,
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
    
    fixture = TestBed.createComponent(MisOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente correctamente (Prueba de Inyección)', () => {
    expect(component).toBeTruthy();
  });
});
